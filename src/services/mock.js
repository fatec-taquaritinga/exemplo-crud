import uuid from 'node-uuid'

export default {
  sites: [
    { id: uuid.v4(), title: 'Fatec Taquaritinga', url: 'www.fatectq.edu.br' },
    { id: uuid.v4(), title: 'Google', url: 'www.google.com.br' }
  ],
  games: [
    { id: uuid.v4(), title: 'StarCraft 2', year: '2010', company: 'Blizzard Entertainment' }
  ]
}
