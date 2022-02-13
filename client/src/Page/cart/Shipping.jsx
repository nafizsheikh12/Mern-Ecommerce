import React,{useState} from 'react';
import { Country, State, City }  from 'country-state-city';
import { useSelector, useDispatch } from "react-redux";
import PinDropIcon from "@mui/icons-material/Home";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import './cart.css';
import {saveshippingInfo} from '../../store/Cart';
import CheckoutSteps from "./Checkout";
import { Link,useNavigate } from "react-router-dom";

const Shipping = () => {
  //const { shippingInfo } = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('shippingInfo.state');
  const [country, setCountry] = useState('shippingInfo.country');
  const [pinCode, setPinCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('shippingInfo.phoneNo');
  const history = useNavigate();

    const shippingSubmit = (e) => {
    e.preventDefault();

    dispatch(
      saveshippingInfo({ address, city, state, country, pinCode, phoneNo} )
    );
    history("/order/confirm");
  };
  return <>
           <CheckoutSteps activeStep={0} />
       <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
  </>;
};

export default Shipping;
