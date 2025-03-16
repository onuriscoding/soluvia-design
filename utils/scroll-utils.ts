export const smoothScrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (!section) return

  // Account for header height
  const headerOffset = 80
  const sectionPosition = section.getBoundingClientRect().top
  const offsetPosition = sectionPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  })
}

export const smoothScrollToNextSection = (currentSectionId: string) => {
  const currentSection = document.getElementById(currentSectionId)
  if (!currentSection) return

  // Find the next section
  const allSections = Array.from(document.querySelectorAll("section"))
  const currentIndex = allSections.indexOf(currentSection)

  if (currentIndex < allSections.length - 1) {
    const nextSection = allSections[currentIndex + 1]
    const headerOffset = 80
    const sectionPosition = nextSection.getBoundingClientRect().top
    const offsetPosition = sectionPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}

