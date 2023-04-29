import MuiButton from '@mui/material/Button'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import { signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsPlusSquareDotted } from 'react-icons/bs'
import { MdOutlineBookmarks, MdOutlineLocalLibrary } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import style from './Header.module.css'

function Header() {
  const [user] = useAuthState(auth)
  const nav = useNavigate()

  // ウィンドウの幅を保持するstate
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    // ウィンドウがリサイズされた際にwindowWidthを更新
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // メニューをハンバーガーメニューに切り替えるウィンドウ幅
  const menu_threshold = 750

  // ナビゲーションメニューの表示状態
  const [showMenu, setShowMenu] = useState(windowWidth > menu_threshold)

  // アカウントメニューの表示状態
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const showAccountMenu = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }

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
      <Link className={style.nav_home} to="/">
        <img
          src={`${process.env.PUBLIC_URL}/assets/storysprout-logo.svg`}
          alt="StorySproutロゴ"
        />
      </Link>
      <div
        className={style.links}
        style={{
          // ウィンドウ幅がmenu_threshold未満 && showMenuがfalse の場合はメニューを非表示
          display: windowWidth > menu_threshold ? '' : showMenu ? '' : 'none',
        }}
      >
        <Link className={style.nav_create} to="/story-input">
          <BsPlusSquareDotted size={18} />
          AIで絵本をつくる
        </Link>
        <Link className={style.nav_collection} to="/collections">
          <MdOutlineBookmarks size={20} />
          絵本コレクション
        </Link>
        <Link className={style.nav_library} to="/library">
          <MdOutlineLocalLibrary size={20} />
          みんなの絵本
        </Link>
      </div>
      <div className={style.header_right}>
        <div className={style.account_wrapper}>
          <MuiButton
            id="account-menu-button"
            className={style.user_wrapper}
            aria-controls={showAccountMenu ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={showAccountMenu ? 'true' : undefined}
            onClick={(e) => {
              if (user) {
                setAnchorEl(e.currentTarget)
              } else {
                nav('/')
              }
            }}
          >
            <div className={style.user_name}>
              {user ? user?.displayName : 'ログイン'}
            </div>
            {user && (
              <div className={style.user_icon}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/profile-icon-placeholder.jpg`}
                  alt="アカウントアイコン画像"
                />
              </div>
            )}
          </MuiButton>
          <MuiMenu
            id="account-menu"
            anchorEl={anchorEl}
            open={showAccountMenu}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'account-menu-button',
            }}
          >
            <MuiMenuItem
              onClick={() => {
                setAnchorEl(null)
                nav('/account')
              }}
            >
              アカウント設定
            </MuiMenuItem>
            <MuiMenuItem
              onClick={() => {
                setAnchorEl(null)
                signOut(auth)
                  .then(() => {
                    console.log('ログアウトしました')
                    nav('/')
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }}
            >
              ログアウト
            </MuiMenuItem>
          </MuiMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
