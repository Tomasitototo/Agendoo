import { useNavigate } from 'react-router-dom'

export const useHashNavigation = () => {
  const navigate = useNavigate()

  const goToSection = (sectionId) => {
    // Si ya estamos en la landing
    if (window.location.pathname === '/') {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Si estamos en otra página, navegá a la 
      // landing y guardá la sección destino
      sessionStorage.setItem('scrollTo', sectionId)
      navigate('/')
    }
  }

  return { goToSection }
}
