import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { Button } from '@mui/material'

const data = [
  { option: '0', style: { backgroundColor: 'green', textColor: 'white' } },
  { option: '1' },
  { option: '2' },
  { option: '3' },
  { option: '4' },
  { option: '5' },
  { option: '6' },
  { option: '7' },
  { option: '8' },
  { option: '9' },
  { option: '10' },
  { option: '11' },
  { option: '12' },
  { option: '13' },
  { option: '14' },
  { option: '15' },
  { option: '16' },
  { option: '17' },
  { option: '18' },
  { option: '19' },
  { option: '20' },
  { option: '21' },
  { option: '22' },
  { option: '23' },
  { option: '24' },
  { option: '25' },
  { option: '26' },
  { option: '27' },
  { option: '28' },
  { option: '29' },
  { option: '30' },
  { option: '31' },
  { option: '32' },
  { option: '33' },
  { option: '34' },
  { option: '35' },
  { option: '36' },
]

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);   
      setMustSpin(true);
      setIsSpinning(true);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#f1a80e', '#002e3c']}
          radiusLineColor='#14343c'
          textColors={['white']}
          textDistance={80}
          perpendicularText={true}
          innerRadius={25}
          innerBorderColor='#14343c'
          innerBorderWidth={30}
          outerBorderColor='#14343c'
          outerBorderWidth={10}
          spinDuration={0.6}
          onStopSpinning={() => {
            setMustSpin(false);
            setIsSpinning(false);
          }}
          styleOptions={{
            backgroundColor: (index) => data[index].style?.backgroundColor || undefined,
            textColor: (index) => data[index].style?.textColor || undefined,
          }}
        />
      </div>
      <Button 
        variant="contained" 
        onClick={handleSpinClick}
        disabled={isSpinning}
      >
        SPIN
      </Button>
      {!isSpinning && prizeNumber !== null && (
        <h2>Result: {data[prizeNumber].option}</h2>
      )}
    </div>
  )
}
