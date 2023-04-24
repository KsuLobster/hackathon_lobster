import { useEffect, useState } from 'react'
import style from './Header.module.css'
import { BsPlusSquareDotted } from 'react-icons/bs'
import { MdOutlineBookmarks, MdOutlineLocalLibrary } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import profile_icon_placeholder from '../assets/profile-icon-placeholder.jpg'

function Header() {
  // ウィンドウの幅を保持するstate
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    // ウィンドウがリサイズされた際にwindowWidthを更新
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // メニューをハンバーガーメニューに切り替えるウィンドウ幅
  const menu_threshold = 670

  // メニューの表示状態
  const [showMenu, setShowMenu] = useState(windowWidth > menu_threshold)

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
          // ウィンドウ幅がmenu_threshold未満 && showMenuがfalse の場合はメニューを非表示
          display: windowWidth > menu_threshold ? '' : showMenu ? '' : 'none',
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
          <img src={profile_icon_placeholder} alt="アカウントアイコン画像" />
        </a>
      </div>
    </header>
  )
}

export default Header
