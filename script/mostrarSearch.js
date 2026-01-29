import { sectionSearch } from './inputHTML.js'
export const mostrarSearch = () => {
    const displaySearch = sectionSearch.style.display == 'none' || sectionSearch.style.display == ''? 'block' : 'none'
    sectionSearch.style.display = displaySearch
}