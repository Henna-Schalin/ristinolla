import '../App.css'
import winimg from '../img/win.svg'

const WinImg = ({ winningRow }) => {

    return (
        <>
            {JSON.stringify(winningRow) === JSON.stringify([0, 1, 2]) && <img src={winimg} className="winimg1 winimg" />}
            {JSON.stringify(winningRow) === JSON.stringify([3, 4, 5]) && <img src={winimg} className="winimg2 winimg" />}
            {JSON.stringify(winningRow) === JSON.stringify([6, 7, 8]) && <img src={winimg} className="winimg3 winimg" />}
            {JSON.stringify(winningRow) === JSON.stringify([0, 3, 6]) && <img src={winimg} className="winimg4 winimg" />}
            {JSON.stringify(winningRow) === JSON.stringify([1, 4, 7]) && <img src={winimg} className="winimg5 winimg" />}
            {JSON.stringify(winningRow) === JSON.stringify([2, 5, 8]) && <img src={winimg} className="winimg6 winimg" />}
            {JSON.stringify(winningRow) === JSON.stringify([0, 4, 8]) && <img src={winimg} className="winimg7 winimg" />}
            {JSON.stringify(winningRow) === JSON.stringify([2, 4, 6]) && <img src={winimg} className="winimg8 winimg" />}

        </>
    )

}

export default WinImg