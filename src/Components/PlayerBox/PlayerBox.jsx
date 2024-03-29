import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteMonsterFromListByKey,
  sortMonstersInCapturedList,
} from '../../Store/Slice/monstersSlice'

import MonsterCardClassic from '../MonsterCard/MonsterCardClassic/MonsterCardClassic'
import MonsterCardLight from '../MonsterCard/MonsterCardLight/MonsterCardLight'
import MenuButton from '../Button/MenuButton/MenuButton'

import './playerBox.scss'

function PlayerBox({ monsterCardStyle }) {
  const dispatch = useDispatch()

  //check the page
  const [currentPage, setCurrentPage] = useState(1)

  let MONSTER_PER_PAGE = 4

  if (monsterCardStyle === 'Light') {
    MONSTER_PER_PAGE = 12
  } else if (monsterCardStyle === 'Classic') {
    MONSTER_PER_PAGE = 4
  }

  let capturedMonsterData = useSelector(
    (state) => state.monsters.capturedMonstersList
  )

  const indexOfLastMonster = currentPage * MONSTER_PER_PAGE
  const indexOfFirstMonster = indexOfLastMonster - MONSTER_PER_PAGE
  const currentMonsters = capturedMonsterData.slice(
    indexOfFirstMonster,
    indexOfLastMonster
  )
  const totalPages = Math.ceil(capturedMonsterData.length / MONSTER_PER_PAGE)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleDeleteMonster = (uniqueKey) => {
    dispatch(deleteMonsterFromListByKey({ uniqueKey: uniqueKey }))
  }

  const handleSort = (criteria) => {
    // Dispatch an action to update the sorting in the Redux store
    dispatch(sortMonstersInCapturedList({ criteria }))
  }

  return (
    <>
      <h3>
        Your stocked monsters (Total Monsters: {capturedMonsterData.length}):
      </h3>
      <div className="sort-button-list">
        <p> Sort by:</p>
        <MenuButton onClick={() => handleSort('id')} boutonName={'Id'} />
        <MenuButton onClick={() => handleSort('level')} boutonName={'Level'} />
        <MenuButton onClick={() => handleSort('race')} boutonName={'Race'} />
        <MenuButton
          onClick={() => handleSort('rarity')}
          boutonName={'Rarity'}
        />
        <MenuButton onClick={() => handleSort('type')} boutonName={'Type'} />
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === totalPages || capturedMonsterData.length === 0
          }
        >
          Next Page
        </button>
      </div>
      <div className="stocked-monsters">
        {currentMonsters &&
          currentMonsters.map((monster, index) => (
            <Fragment key={monster.uniqueKey + index}>
              {monsterCardStyle === 'Classic' && (
                <MonsterCardClassic
                  key={`card_${monster.uniqueKey}`}
                  monster={monster}
                  onDelete={() => handleDeleteMonster(monster.uniqueKey)}
                  canAccessMenu={true}
                  canBeRemovedFromTeam={false}
                  canBeDelete={true}
                  showStats={true}
                />
              )}
              {monsterCardStyle === 'Light' && (
                <MonsterCardLight
                  key={`light__card_${monster.uniqueKey}`}
                  monster={monster}
                  canAccessMenu={true}
                  canBeRemovedFromTeam={false}
                  canBeDelete={true}
                  showStats={true}
                />
              )}
            </Fragment>
          ))}
      </div>
    </>
  )
}

export default PlayerBox
