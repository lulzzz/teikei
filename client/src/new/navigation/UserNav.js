import React from 'react'
import { Link } from 'react-router'
import { MY_ENTRIES, NEW_FARM, NEW_DEPOT } from '../AppRouter'

const UserNavDropdown = ({ toggle, onEditClick, onSignOutClick }) => (
  toggle === false ? null : (
    <ul className="dropdown user-nav-dropdown">
      <li className="user-nav-account">
        <a href="#" onClick={() => onEditClick()}>{I18n.t('nav.edit_account')}</a>
      </li>
      <li className="user-nav-signout">
        <a href="#" onClick={() => onSignOutClick()} rel="nofollow">{I18n.t('nav.logout')}</a>
      </li>
    </ul>
  )
)
UserNavDropdown.propTypes = {
  toggle: React.PropTypes.bool.isRequired,
  onSignOutClick: React.PropTypes.func.isRequired,
  onEditClick: React.PropTypes.func.isRequired,
}

class UserNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = { toggleUserNav: false }
  }

  toggleUserNav = (event) => {
    event.preventDefault();
    this.setState({
      toggleUserNav: !this.state.toggleUserNav,
    })
  }

  toggleUserNav = (event) => {
    event.preventDefault();
    this.setState({
      toggleUserNav: !this.state.toggleUserNav,
    })
  }

  render() {
    return (
      <div>
        <div className="user-nav-main user-nav-toggle">
          <a onClick={this.toggleUserNav}>{this.props.username}</a>
        </div>

        <UserNavDropdown
          toggle={this.state.toggleUserNav}
          onEditClick={this.props.onEditClick}
          onSignOutClick={this.props.onSignOutClick}
        />

        {/* TODO: Move this into a separate component to not have this within the hamburger menu */}
        <div className="entries-nav">
          <ul>
            <li className="entries-nav-item entries-nav-list">
              <Link to={MY_ENTRIES}>{I18n.t('nav.my_entries')}</Link>
            </li>
            <li className="entries-nav-item entries-nav-new">
              <a href="#new-entry-dropdown">{I18n.t('nav.new_entry')}</a>
            </li>
          </ul>

          <ul className="dropdown entries-nav-dropdown">
            <li>
              <Link to={NEW_DEPOT}>{I18n.t('nav.new_depot')}</Link>
            </li>
            <li>
              <Link to={NEW_FARM}>{I18n.t('nav.new_farm')}</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

UserNav.propTypes = {
  onSignOutClick: React.PropTypes.func.isRequired,
  onEditClick: React.PropTypes.func.isRequired,
  username: React.PropTypes.string.isRequired,
}

export default UserNav
