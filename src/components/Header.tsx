import { useEffect, useState } from 'react'
import style from './Header.module.css'
import { BsPlusSquareDotted } from 'react-icons/bs'
import { MdOutlineBookmarks, MdOutlineLocalLibrary } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuThreshold = 670
  const [showMenu, setShowMenu] = useState(windowWidth > menuThreshold)

  return (
    <header>
      <div
        className={style.menu_button}
        onClick={() => {
          setShowMenu((cur) => !cur)
        }}
      >
        <RxHamburgerMenu size={24} />
      </div>
      <a className={style.nav_home} href="/">
        絵本ツクール
      </a>
      <div
        className={style.links}
        style={{
          display: windowWidth > menuThreshold ? '' : showMenu ? '' : 'none',
        }}
      >
        <a className={style.nav_create} href="/story-input">
          <BsPlusSquareDotted size={18} />
          AIで絵本をつくる
        </a>
        <a className={style.nav_collection} href="/collections">
          <MdOutlineBookmarks size={20} />
          絵本コレクション
        </a>
        <a className={style.nav_library} href="/library">
          <MdOutlineLocalLibrary size={20} />
          みんなの絵本
        </a>
      </div>
      <div className={style.header_right}>
        <a className={style.nav_account} href="/signin">
          <img src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" />
        </a>
      </div>
    </header>
  )
}

export default Header
