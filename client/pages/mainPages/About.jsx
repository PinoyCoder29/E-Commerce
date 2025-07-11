import React, { useState, useEffect } from 'react'

const About = () => {
  const words = ['Full Stack Developer', 'React Developer', 'UI/UX Designer']
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    let typingSpeed = isDeleting ? 50 : 100

    const timer = setTimeout(() => {
      setText((prev) =>
        isDeleting ? currentWord.slice(0, prev.length - 1) : currentWord.slice(0, prev.length + 1)
      )

      // done typing
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000)
      }

      // done deleting
      if (isDeleting && text === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, currentWordIndex])

  return (
    <div className="text-center text-white bg-dark p-5">
      <h1 className="fw-bold" style={{ fontSize: '60px' }}>Jayvee Bico</h1>
      <h3 className="text-warning" style={{ minHeight: '40px' }}>
        {text}
        <span className="blinking-cursor">|</span>
      </h3>
    </div>
  )
}

export default About
