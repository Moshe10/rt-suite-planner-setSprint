import React from 'react'
import './simpleButton.css'

export default class Button extends React.Component {

    render() {
        const {
            variant,
            content,
            ...others
        } = this.props;

        return (
            <button className={variant} {...others}>
                {content}
            </button>
        )
    }
}