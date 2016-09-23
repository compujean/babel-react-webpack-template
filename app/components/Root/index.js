import React from 'react';
import style from './style.css';
import image from '../../../images/mrmeseeks.gif';

export default class Root extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={style.myStyle}>
				<div>I'm Mr Meseeks!</div>
				<img src={image}/>
			</div>
		)
	}

}