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
        coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'
      },
      {
        id: 2,
        title: 'KARMA',
        artistId: 2,
        releaseYear: 2025,
        genre: 'K-Pop',
        coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
      },
      {
        id: 3,
        title: 'For All The Dogs',
        artistId: 3,
        releaseYear: 2025,
        genre: 'Hip-Hop',
        coverUrl: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2'
      },
      {
        id: 4,
        title: 'Hurry Up Tomorrow',
        artistId: 4,
        releaseYear: 2025,
        genre: 'R&B',
        coverUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063'
      },
      {
        id: 5,
        title: 'DeBÍ TiRAR MáS FOToS',
        artistId: 5,
        releaseYear: 2025,
        genre: 'Latin Trap',
        coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81'
      },
      {
        id: 6,
        title: 'GNX',
        artistId: 6,
        releaseYear: 2025,
        genre: 'Hip-Hop',
        coverUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b'
      },
      {
        id: 7,
        title: 'I’m The Problem',
        artistId: 7,
        releaseYear: 2025,
        genre: 'Country',
        coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'
      },
      {
        id: 8,
        title: 'Short n’ Sweet',
        artistId: 8,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491'
      },
      {
        id: 9,
        title: 'HIT ME HARD AND SOFT',
        artistId: 9,
        releaseYear: 2025,
        genre: 'Alternative Pop',
        coverUrl: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1'
      },
      {
        id: 10,
        title: 'MAYHEM',
        artistId: 10,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d'
      },
      {
        id: 11,
        title: 'Eternal Sunshine',
        artistId: 11,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76'
      },
      {
        id: 12,
        title: 'Chromakopia',
        artistId: 12,
        releaseYear: 2025,
        genre: 'Hip-Hop',
        coverUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
      },
      {
        id: 13,
        title: 'HAPPY BURSTDAY',
        artistId: 13,
        releaseYear: 2025,
        genre: 'J-Pop',
        coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee'
      },
      {
        id: 14,
        title: 'SPILL THE FEELS',
        artistId: 14,
        releaseYear: 2025,
        genre: 'K-Pop',
        coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'
      },
      {
        id: 15,
        title: 'The Death of Slim Shady',
        artistId: 15,
        releaseYear: 2025,
        genre: 'Hip-Hop',
        coverUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3'
      },
      {
        id: 16,
        title: 'From Zero',
        artistId: 16,
        releaseYear: 2025,
        genre: 'Rock',
        coverUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b'
      },
      {
        id: 17,
        title: 'The Great American Bar Scene',
        artistId: 17,
        releaseYear: 2025,
        genre: 'Country',
        coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1'
      },
      {
        id: 18,
        title: 'Play',
        artistId: 18,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
      },
      {
        id: 19,
        title: 'SOS Deluxe',
        artistId: 19,
        releaseYear: 2025,
        genre: 'R&B',
        coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491'
      },
      {
        id: 20,
        title: 'SWAG',
        artistId: 20,
        releaseYear: 2025,
        genre: 'Pop',
        coverUrl: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2'
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