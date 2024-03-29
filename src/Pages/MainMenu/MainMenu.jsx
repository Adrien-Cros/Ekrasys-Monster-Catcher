import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import PlayerBox from '../../Components/PlayerBox/PlayerBox'
import PlayerTeam from '../../Components/PlayerTeam/PlayerTeam'
import PlayerInventory from '../../Components/PlayerInventory/PlayerInventory'
import StarterMonsterSelection from '../../Components/StarterMonsterSelection/StarterMonsterSelection'
import MenuButton from '../../Components/Button/MenuButton/MenuButton'

import {
  setInComboMode,
  setInRandomEncounter,
} from '../../Store/Slice/gameStatusSlice'

import './mainMenu.scss'

function MainMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //hide or show player box/team
  const [showPlayerBox, setShowPlayerBox] = useState(false)
  //hide or show inventory
  const [showInventory, setShowInventory] = useState(false)
  //used to change the view, by default Classic
  const [cardStyle, setCardStyle] = useState('Classic')
  //used to set an error message if needed
  const [errorMessage, setErrorMessage] = useState('')

  //change the card view
  const handleChangeView = () => {
    if (cardStyle === 'Classic') {
      setCardStyle('Light')
    } else if (cardStyle === 'Light') {
      setCardStyle('Classic')
    }
  }

  const teamMonsters = useSelector(
    (state) => state.monsterTeam.actualMonstersInTeam
  )

  const alreadyHaveStarter = useSelector(
    (state) => state.config.alreadyHaveStarter
  )

  const togglePlayerBox = () => {
    setShowInventory(false)
    setShowPlayerBox(!showPlayerBox)
  }

  const toggleInventory = () => {
    setShowPlayerBox(false)
    setShowInventory(!showInventory)
  }

  const handleRandomEncounter = () => {
    if (teamMonsters.length <= 0) {
      setErrorMessage('You need atleast 1 monsters in your team')
      setTimeout(() => setErrorMessage(''), 3000)
    } else {
      dispatch(setInRandomEncounter(true))
      navigate('/random-encounter')
    }
  }

  const handleComboModeButton = () => {
    if (teamMonsters.length < 4) {
      setErrorMessage('You need atleast 4 monsters in your team')
      setTimeout(() => setErrorMessage(''), 3000)
    } else {
      dispatch(setInComboMode(true))
      navigate('/combo')
    }
  }

  return (
    <section className="main-menu fullview">
      {alreadyHaveStarter ? (
        <>
          <div className="mission-container">
            <div className="mission-button-container">
              <MenuButton
                onClick={handleRandomEncounter}
                boutonName={'Random Encounter'}
              />
              <MenuButton
                onClick={handleComboModeButton}
                boutonName={'Combo Mode'}
              />
              <MenuButton onClick={null} boutonName={'Arena'} />
            </div>
            <div
              className={`information-message ${
                errorMessage !== '' ? 'information-message-animation' : ''
              }`}
            >
              {errorMessage !== '' && <>{errorMessage}</>}
            </div>
          </div>
          <div className="main-menu-container">
            <div className="misc-button">
              <MenuButton
                onClick={togglePlayerBox}
                boutonName={'Stocked Monsters'}
              />
              <MenuButton onClick={toggleInventory} boutonName={'Inventory'} />
              <MenuButton onClick={null} boutonName={'Skilltree'} />
              <MenuButton onClick={null} boutonName={'Shop'} />
            </div>

            {showPlayerBox && (
              <div className="box-container-global">
                <MenuButton
                  onClick={handleChangeView}
                  boutonName={`Monster card: "${cardStyle}"`}
                />
                <div className="box-container">
                  <div className="player-monsters-equip">
                    <PlayerTeam
                      canAccessMonsterMenu={true}
                      monsterCardStyle={cardStyle}
                    />
                  </div>
                  <div className="player-box">
                    <PlayerBox monsterCardStyle={cardStyle} />
                  </div>
                </div>
              </div>
            )}
            {showInventory && (
              <div className="player-inventory">
                <PlayerInventory />
              </div>
            )}
          </div>
        </>
      ) : (
        <StarterMonsterSelection />
      )}
    </section>
  )
}

export default MainMenu
