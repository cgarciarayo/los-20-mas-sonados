import { defineStore } from 'pinia'

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: [
      {
        id: 1,
        title: 'The Tortured Poets Department',
        artistId: 1,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: new URL('../assets/albums/the-tortured-poets-department.jpg', import.meta.url).href
      },
      {
        id: 2,
        title: 'KARMA',
        artistId: 2,
        releaseYear: 2025,
        genre: 'K-Pop',
        coverUrl: new URL('../assets/albums/karma.jpg', import.meta.url).href
      },
      {
        id: 3,
        title: 'For All The Dogs',
        artistId: 3,
        releaseYear: 2025,
        genre: 'Hip-Hop',
        coverUrl: new URL('../assets/albums/for-all-the-dogs.jpg', import.meta.url).href
      },
      {
        id: 4,
        title: 'Hurry Up Tomorrow',
        artistId: 4,
        releaseYear: 2025,
        genre: 'R&B',
        coverUrl: new URL('../assets/albums/hurry-up-tomorrow.jpg', import.meta.url).href
      },
      {
        id: 5,
        title: 'DeBÍ TiRAR MáS FOToS',
        artistId: 5,
        releaseYear: 2025,
        genre: 'Latin Trap',
        coverUrl: new URL('../assets/albums/debi-tirar-mas-fotos.jpg', import.meta.url).href
      },
      {
        id: 6,
        title: 'GNX',
        artistId: 6,
        releaseYear: 2025,
        genre: 'Hip-Hop',
        coverUrl: new URL('../assets/albums/gnx.jpg', import.meta.url).href
      },
      {
        id: 7,
        title: 'I’m The Problem',
        artistId: 7,
        releaseYear: 2025,
        genre: 'Country',
        coverUrl: new URL('../assets/albums/im-the-problem.jpg', import.meta.url).href
      },
      {
        id: 8,
        title: 'Short n’ Sweet',
        artistId: 8,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: new URL('../assets/albums/short-n-sweet.jpg', import.meta.url).href
      },
      {
        id: 9,
        title: 'HIT ME HARD AND SOFT',
        artistId: 9,
        releaseYear: 2025,
        genre: 'Alternative Pop',
        coverUrl: new URL('../assets/albums/hit-me-hard-and-soft.jpg', import.meta.url).href
      },
      {
        id: 10,
        title: 'MAYHEM',
        artistId: 10,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: new URL('../assets/albums/mayhem.jpg', import.meta.url).href
      },
      {
        id: 11,
        title: 'Eternal Sunshine',
        artistId: 11,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: new URL('../assets/albums/eternal-sunshine.jpg', import.meta.url).href
      },
      {
        id: 12,
        title: 'Chromakopia',
        artistId: 12,
        releaseYear: 2025,
        genre: 'Hip-Hop',
        coverUrl: new URL('../assets/albums/chromakopia.jpg', import.meta.url).href
      },
      {
        id: 13,
        title: 'HAPPY BURSTDAY',
        artistId: 13,
        releaseYear: 2025,
        genre: 'J-Pop',
        coverUrl: new URL('../assets/albums/happy-burstday.jpg', import.meta.url).href
      },
      {
        id: 14,
        title: 'SPILL THE FEELS',
        artistId: 14,
        releaseYear: 2025,
        genre: 'K-Pop',
        coverUrl: new URL('../assets/albums/spill-the-feels.jpg', import.meta.url).href
      },
      {
        id: 15,
        title: 'The Death of Slim Shady',
        artistId: 15,
        releaseYear: 2025,
        genre: 'Hip-Hop',
        coverUrl: new URL('../assets/albums/the-death-of-slim-shady.jpg', import.meta.url).href
      },
      {
        id: 16,
        title: 'From Zero',
        artistId: 16,
        releaseYear: 2025,
        genre: 'Rock',
        coverUrl: new URL('../assets/albums/from-zero.jpg', import.meta.url).href
      },
      {
        id: 17,
        title: 'The Great American Bar Scene',
        artistId: 17,
        releaseYear: 2025,
        genre: 'Country',
        coverUrl: new URL('../assets/albums/the-great-american-bar-scene.jpg', import.meta.url).href
      },
      {
        id: 18,
        title: 'Play',
        artistId: 18,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: new URL('../assets/albums/play.jpg', import.meta.url).href
      },
      {
        id: 19,
        title: 'SOS Deluxe',
        artistId: 19,
        releaseYear: 2025,
        genre: 'R&B',
        coverUrl: new URL('../assets/albums/sos-deluxe.jpg', import.meta.url).href
      },
      {
        id: 20,
        title: 'SWAG',
        artistId: 20,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: new URL('../assets/albums/swag.jpg', import.meta.url).href
      }
    ]
  }),

  getters: {
    getAlbumsByArtistId: (state) => (artistId) => {
      return state.albums.filter((album) => album.artistId === artistId)
    }
  },

  actions: {
    addAlbum(album) {
      const newAlbum = {
        ...album,
        id: this.getNextId()
      }

      this.albums.push(newAlbum)
    },

    updateAlbum(updatedAlbum) {
      const albumIndex = this.albums.findIndex((album) => album.id === updatedAlbum.id)

      if (albumIndex !== -1) {
        this.albums[albumIndex] = { ...updatedAlbum }
      }
    },

    deleteAlbum(albumId) {
      this.albums = this.albums.filter((album) => album.id !== albumId)
    },

    getNextId() {
      if (this.albums.length === 0) {
        return 1
      }

      return Math.max(...this.albums.map((album) => album.id)) + 1
    }
  }
})