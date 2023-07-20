import photo from './img/photo.png'

export default function WorkerPanelInfo({data}) {
  const workerItemLabelStyle = `pt-1 font-semibold text-neutral-600 workerItemLabel basis-64`
  const workerItemBoxStyle = `ml-6 flex p-2 hover:bg-neutral-100 text-black border-b border-neutral-300 cursor-pointer`
  const workerItemContentStyle = `w-full workerItemContent text-lg`
  const arrowItemStyle = `text-neutral-500 text-xl font-semibold mx-8 float-right`

  return (
      <div className='workerItemLabel w-1/4 grid grid-flow-row grid-cols-1 grid-row-6 border-r border-neutral-400'>
        <div className='text-center my-1 text-lg font-medium'>
          Główne informacje
        </div>
        <div className={`workerImg ${workerItemBoxStyle}`}>
        <div className={workerItemLabelStyle}>
          <img src={photo} alt='zdjecie doktora' className='workerImg my-auto ml-10 rounded-full w-16 h-16'/> 
        </div>
            <div className='my-auto'>edit me!</div>
        </div>
        <div className={`workerName ${workerItemBoxStyle}`}>
          <div className={workerItemLabelStyle}>
            Imie i nazwisko
          </div>  
          <div className={workerItemContentStyle}>
            Mateusz Klimczak
          </div>
          <div className={arrowItemStyle}>
            &gt;
          </div>
        </div>
        <div className={`workerPlace ${workerItemBoxStyle}`}>
        <div className={workerItemLabelStyle}>
            Miejsce wizyty
          </div>
          <div className={workerItemContentStyle}>
          os. jagiełly 1410
          </div>
          <div className={arrowItemStyle}>
            &gt;
          </div>
        </div>
        <div className={`workerPhone ${workerItemBoxStyle}`}>
        <div className={workerItemLabelStyle}>
            Nr kontaktowy/email:
          </div>
          <div className={workerItemContentStyle}>
          +48 64912414
          </div>
          <div className={arrowItemStyle}>
            &gt;
          </div>
        </div>
        <div className={`workerPrice ${workerItemBoxStyle}`}>
        <div className={workerItemLabelStyle}>
            Ustalona cena/wizyta:
          </div>
          <div className={workerItemContentStyle}>
          150zł
          </div>
          <div className={arrowItemStyle}>
            &gt;
          </div>
        </div>
      </div>
  )
}