import React, { Component } from "react"
import './Metronome.css'
import click1 from './click1.wav'
import click2 from './click2.wav'

class Metronome extends Component {

    constructor(props){
        super(props)

        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        }

        this.click1 = new Audio(click1)
        this.click2 = new Audio(click2)
    }

    startStop = () => {
        if (this.state.playing) { //if it's playing button will stop timer
            clearInterval(this.timer)
            this.setState({
                playing:false
            })
        } else { //otherwise start a timer with the current bpm
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            )
            this.setState(
                {
                    count: 0, //keeps track of what beat we are on, so that the first beat sounds different. could also make the bar beat sound different
                    playing: true
                },
                this.playClick // Play the first click right after setState finishes
            )
        }
    }

    playClick = () => {
        const { count, beatsPerMeasure } = this.state

        if (count % beatsPerMeasure === 0) { //first beat has a different sound
            this.click2.play()
        } else {
            this.click1.play()
        }

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure //keeps track of the current beat
        }))
    }

    handleBpmChange = (event) => {
        const bpm = event.target.value
        this.setState({ bpm })

        if (this.state.playing) {
            //stop timer and start a new one
            clearInterval(this.timer)
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000)

            //set new BPM and reset the counter
            this.setState({
                count: 0,
                bpm
            }) 
        } else {
            //Otherwise update BPM. This is when the metronome is not playhing
            this.setState({ bpm })
        }
    }
    
    render() {
        const { playing, bpm } = this.state

        return (
            <div className="metronome">
                <div className = "bpm-slider">
                    <div>{bpm} BPM</div>
                    <input 
                        type = 'range' 
                        min = '60' 
                        max='240' 
                        value={bpm} 
                        onChange={this.handleBpmChange}
                    />
                </div>
                <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
            </div>
        )
    }
}

export default Metronome