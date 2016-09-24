import React from 'react';
import style from './style.css';
import image from '../../../images/mrmeseeks.gif';
import FontAwesome from 'react-fontawesome';

export default class Root extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={style.myStyle}>
				<div>
					I'm Mr Meseeks!
					<FontAwesome
						className='super-crazy-colors'
						name='rocket'
						spin
						style={{ textShadow: '0 2px 0 rgba(0, 0, 0, 0.3)' }}
					/>
				</div>
				<img src={image}/>
			</div>
		)
	}

}