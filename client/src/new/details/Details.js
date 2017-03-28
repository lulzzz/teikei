import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import PlaceDescription from './components/PlaceDescription'
import ContactTabContainer from './tabs/ContactTabContainer'
import Header from './components/Header'
import MembershipInfo from './components/MembershipInfo'
import { getMapPositionPath } from '../AppRouter'
import i18n from '../i18n'

class Details extends Component {

  constructor(props) {
    super(props)
    this.state = { isContactActive: false }
  }

  toggleContact = () => {
    this.setState({
      isContactActive: !this.state.isContactActive,
    })
  }

  render() {
    const mapUrl = getMapPositionPath({
      lat: this.props.place.latitude,
      lon: this.props.place.longitude,
    })

    const contactButtonClassNames = classNames({
      'details-contact-button': true,
      active: this.state.isContactActive,
    })

    return (
      <article className="details">
        <div className="details-container">

          <Link className="details-back" to={mapUrl}>
            {i18n.t('nav.go_back')}
          </Link>

          <Header place={this.props.place} />

          <div className="details-content">
            <PlaceDescription place={this.props.place} />
          </div>

          <div className="details-contact">
            <MembershipInfo place={this.props.place} />
            <button onClick={this.toggleContact} className={contactButtonClassNames}>
              Kontakt
            </button>
            {this.state.isContactActive && <ContactTabContainer place={this.props.place} />}
          </div>

          {/* <Footer place={this.props.place} /> */}
        </div>
      </article>
    )
  }
}

Details.propTypes = {
  place: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    latitude: React.PropTypes.string.isRequired,
    longitude: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default Details
