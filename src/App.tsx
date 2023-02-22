import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/imc.png'
import leftArrowImage from './assets/leftarrow.png'
import phalter from './assets/imgph.png'

import { GridItem } from './components/GridItem'


import { levels, calcImc, Level} from './helpers/imc'

const App = () => {
  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null)

  const handleCalcButton = () => {
    if (heightField && weightField) {
      setToShow(calcImc(heightField,weightField))
    } else {
      alert('Por favor preencha todos os campos!')
    }
  }

  const hendleBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }

  return (
    <div className={styles.main}>
      <div className={styles.bodyField}>
        <header>
          <div className={styles.headerContainer}>
            <img src={poweredImage} alt='' width={280} />
          </div>
        </header>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule o seu IMC.</h1>
            <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado
              pela Organização Mundial de Saúde (OMS) para calcular o peso ideal de
              uma pessoa considerada saudável.
            </p>

            <div className={styles.bodyleft}>
              <div>
                <div>
                  Digite a sua altura:
                </div>
                <input
                  type="number"
                  placeholder='Ex: 168cm'
                  value={heightField > 0 ? heightField : ''}
                  onChange={e => setHeightField(parseFloat(e.target.value))}
                  disabled={toShow ? true : false}
                />

                <div>
                  Digite o seu peso:
                </div>
                <input
                  type="number"
                  placeholder='Ex: 78.5Kg'
                  value={weightField > 0 ? weightField : ''}
                  onChange={e => setWeightField(parseFloat(e.target.value))}
                  disabled={toShow ? true : false}
                />
              </div>

              <div>
                <img src={phalter} alt='' width={180} />
              </div>
            </div>

            <button onClick={handleCalcButton} disabled={toShow ? true : false}>Calcular</button>
          </div>
          <div className={styles.rightSide}>
            {!toShow && 
               <div className={styles.grid}>
               {levels.map((item, key)=>(
                 <GridItem key={key} item={item} />
               ))}
             </div>
            }
            {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={hendleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow}/>
            </div> 
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
