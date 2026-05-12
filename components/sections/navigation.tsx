'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '#about', label: 'About', number: '01.' },
  { href: '#skills', label: 'Skills', number: '02.' },
  { href: '#projects', label: 'Projects', number: '03.' },
  { href: '#achievements', label: 'Achievements', number: '04.' },
  { href: '#contact', label: 'Contact', number: '05.' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${isScrolled ? 'glass' : 'bg-transparent'
            }`}>
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-2xl font-bold font-mono tracking-wider text-white flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              [ PSP ] <span className="w-2 h-2 rounded-full bg-primary" />
            </motion.a>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${activeSection === item.href.slice(1)
                      ? 'text-white'
                      : 'text-muted-foreground hover:text-white'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.number && <span className="font-mono text-primary mr-1 text-xs">{item.number}</span>}
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* CTA button */}
            <motion.a
              href="/2023IMT056-PSP.pdf"
              download="2023IMT056-PSP.pdf"
              className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-none border border-primary text-primary text-[10px] md:text-sm font-mono uppercase tracking-wider hover:bg-primary/10 transition-colors mr-2 md:mr-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume ↗
            </motion.a>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 rounded-full glass"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#000000]/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <div className="relative h-full flex flex-col items-center justify-center gap-8 p-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-3xl font-semibold transition-colors ${activeSection === item.href.slice(1)
                      ? 'text-gradient-primary'
                      : 'text-white hover:text-primary'
                    }`}
                >
                  <span className="font-mono text-primary block text-sm mb-1">{item.number}</span>
                  {item.label}
                </motion.button>
              ))}

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                href="/2023IMT056-PSP.pdf"
                download="2023IMT056-PSP.pdf"
                className="mt-8 px-8 py-4 border border-primary text-primary font-mono uppercase tracking-wider hover:bg-primary/10 transition-colors"
              >
                Resume ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
