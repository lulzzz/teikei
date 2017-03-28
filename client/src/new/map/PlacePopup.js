import React, { PropTypes } from 'react'
import { getDetailsPath, history } from '../AppRouter'
import i18n from '../i18n'

const translatedProducts = (place) => {
  if (place.type === 'Farm') {
    return place.animal_products
      .concat(place.vegetable_products)
      .concat(place.beverages)
      .filter(p => p !== null)
      .map(p => i18n.t(`products.${p}`))
      .join(', ')
  }
  return ''
}

const PlacePopup = ({ place }) => (
  <div className="map-popup">
    <h3>{place.name}</h3>
    <em>{place.city}</em>
    <p>{translatedProducts(place)}</p>
    <a className="details-link" href={history.createHref(getDetailsPath(place))}>Details</a>
  </div>
)

PlacePopup.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    city: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PlacePopup
