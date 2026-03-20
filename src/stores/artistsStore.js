import { defineStore } from 'pinia'

export const useArtistsStore = defineStore('artists', {
  state: () => ({
    artists: [
      {
        id: 1,
        name: 'Taylor Swift',
        genre: 'Pop',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'
      },
      {
        id: 2,
        name: 'Stray Kids',
        genre: 'K-Pop',
        country: 'South Korea',
        imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
      },
      {
        id: 3,
        name: 'Drake',
        genre: 'Hip-Hop',
        country: 'Canada',
        imageUrl: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2'
      },
      {
        id: 4,
        name: 'The Weeknd',
        genre: 'R&B',
        country: 'Canada',
        imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063'
      },
      {
        id: 5,
        name: 'Bad Bunny',
        genre: 'Latin Trap',
        country: 'Puerto Rico',
        imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81'
      },
      {
        id: 6,
        name: 'Kendrick Lamar',
        genre: 'Hip-Hop',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b'
      },
      {
        id: 7,
        name: 'Morgan Wallen',
        genre: 'Country',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
      },
      {
        id: 8,
        name: 'Sabrina Carpenter',
        genre: 'Pop',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491'
      },
      {
        id: 9,
        name: 'Billie Eilish',
        genre: 'Alternative Pop',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1'
      },
      {
        id: 10,
        name: 'Lady Gaga',
        genre: 'Pop',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d'
      },
      {
        id: 11,
        name: 'Ariana Grande',
        genre: 'Pop',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76'
      },
      {
        id: 12,
        name: 'Tyler, The Creator',
        genre: 'Hip-Hop',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
      },
      {
        id: 13,
        name: 'Mrs. GREEN APPLE',
        genre: 'J-Pop',
        country: 'Japan',
        imageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee'
      },
      {
        id: 14,
        name: 'SEVENTEEN',
        genre: 'K-Pop',
        country: 'South Korea',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'
      },
      {
        id: 15,
        name: 'Eminem',
        genre: 'Hip-Hop',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3'
      },
      {
        id: 16,
        name: 'Linkin Park',
        genre: 'Rock',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b'
      },
      {
        id: 17,
        name: 'Zach Bryan',
        genre: 'Country',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1'
      },
      {
        id: 18,
        name: 'Ed Sheeran',
        genre: 'Pop',
        country: 'United Kingdom',
        imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
      },
      {
        id: 19,
        name: 'SZA',
        genre: 'R&B',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491'
      },
      {
        id: 20,
        name: 'Justin Bieber',
        genre: 'Pop',
        country: 'Canada',
        imageUrl: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2'
      }
    ]
  }),

  getters: {
    getArtistById: (state) => (artistId) => {
      return state.artists.find((artist) => artist.id === artistId)
    }
  },

  actions: {
    addArtist(artist) {
      const newArtist = {
        ...artist,
        id: this.getNextId()
      }

      this.artists.push(newArtist)
    },

    updateArtist(updatedArtist) {
      const artistIndex = this.artists.findIndex((artist) => artist.id === updatedArtist.id)

      if (artistIndex !== -1) {
        this.artists[artistIndex] = { ...updatedArtist }
      }
    },

    deleteArtist(artistId) {
      this.artists = this.artists.filter((artist) => artist.id !== artistId)
    },

    getNextId() {
      if (this.artists.length === 0) {
        return 1
      }

      return Math.max(...this.artists.map((artist) => artist.id)) + 1
    }
  }
})