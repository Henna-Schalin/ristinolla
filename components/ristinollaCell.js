import Grid from '@mui/material/Grid'
import ximg from '../img/X.png'
import oimg from '../img/O.png'
import '../App.css'

const RistinollaCell = ({ handleClick, showImage, index, bottom, height, width, type }) => {

    return (
        <>
            <Grid item sx={{ height: height, width: width, position: 'relative' }} onClick={() => handleClick(index)}>
                {showImage[index][0] && (
                    <img src={ximg} className={type !== "miniature" ? "ximg1" : "ximg1-mini"} style={{ position: 'absolute', bottom: bottom, right: '35px' }} />
                )}
                {showImage[index][1] && (
                    <img src={oimg} className={type !== "miniature" ? "oimg1" : "oimg1-mini"} style={{ position: 'absolute', bottom: bottom, right: '35px' }} />
                )}
            </Grid>
        </>
    )

}

export default RistinollaCell