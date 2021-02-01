import { QuizzerProtocol } from '@tooxoot/quizzer-protocol'

import { writable } from 'svelte/store'
import { state } from './state'

export interface Client {
  username: string
  isOpen: boolean
  isConnecting: boolean
}

const getInitialClient = (): Client => ({
  username: '',
  isOpen: false,
  isConnecting: false,
})

const init = () => {
  const { subscribe, set, update } = writable<Client>(getInitialClient())

  let lastUpdate: number
  const unsub = state.subscribe(s => (lastUpdate = s.timestamp))

  let ws: WebSocket

  const connect = (connectAsHost = false, username = '') => {
    if (!connectAsHost && !username) {
      console.error('client.connect: guests require valid username')
      set(getInitialClient())
      return
    }

    ws = new WebSocket('ws://localhost:8080')

    update(c => ({ ...c, isConnecting: true }))

    ws.onopen = () => update(c => ({ ...c, isOpen: true, isConnecting: false }))

    ws.onmessage = e => {
      const data = QuizzerProtocol.Server.Message.parse(e.data)

      console.log(`received message`, lastUpdate, data)

      if (data.state.timestamp < lastUpdate) {
        return
      }

      state.set(data.state)
    }

    ws.onerror = e => {
      console.error('client: error', e)
    }

    ws.onclose = (e: CloseEvent) => {
      console.log('client: was closed', e)
      unsub()
      set(getInitialClient())
      ws = undefined
    }
  }

  const send = (data: QuizzerProtocol.GuestClient.Message) => {
    if (!ws) {
      console.error('client.send: no websocket to send on')
      return
    }
    ws.send(JSON.stringify(data))
  }

  return {
    subscribe,
    send,
    connect,
  }
}

export const client = init()
