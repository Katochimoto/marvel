import {
  updateCharactersList,
  updateCharactersData,
} from './actions'

const PAGE_SIZE = 40
const API_URI = 'https://gateway.marvel.com:443/v1/public'
const API_KEY = 'ad01899978c9c4d4c607ae41b2588da6'

export function getCharacters (page) {
  const OFFSET = (page - 1) * PAGE_SIZE
  const LIMIT = PAGE_SIZE + 1

  fetch(`${API_URI}/characters?orderBy=-modified&limit=${LIMIT}&offset=${OFFSET}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      const { data: { count, results } } = json

      updateCharactersData(results.reduce((data, item) => {
        data[item.id] = {
          description: item.description,
          id: item.id,
          modified: item.modified,
          name: item.name,
          photo: `${item.thumbnail.path}/standard_xlarge.${item.thumbnail.extension}`,
          resourceURI: item.resourceURI,
        }
        return data
      }, {}))

      updateCharactersList({
        hasMore: LIMIT === count,
        items: results.slice(0, PAGE_SIZE).map(item => item.id),
      })

    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
}
