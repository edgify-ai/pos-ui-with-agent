// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header';
import './confirmationScreen.scss';

const calculatePrice = (weight, price) => {
  return (parseFloat(weight) * parseFloat(price)).toFixed(2);
};

const itemPropsTable = (weight, price) => {
  return (
    <table cellPadding="0" className="itemPropsTable">
      <tbody className="itemPropsTableBody">
        <tr className="tableRow">
          <td className="itemPropLabel">
            <label>Weight (kg)</label>
          </td>
          <td className="itemPropValue">
            <label>{weight ? parseFloat(weight).toFixed(2) : '0.00'}</label>
          </td>
        </tr>
        <tr className="tableRow">
          <td className="itemPropLabel">
            <label>Unit Price ($/kg)</label>
          </td>
          <td className="itemPropValue">
            <label>
              {price
                ? parseFloat(price).toFixed(2)
                : '0.00'}{' '}
            </label>
          </td>
        </tr>
        <tr className="tableRow rowSeparator">
          <td className="itemPropLabel">
            <label>Total Price</label>
          </td>
          <td className="itemPropValue">
            <label>
              {weight && price
                ? calculatePrice(weight, price)
                : '0.00'}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ({
  weight,
  label,
  gt,
  image,
  price,
  addItemToReciept,
  rawPrediction,
}: Props) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="dashboardWrapper">
        <table cellPadding="0">
          <tbody>
            <tr valign="top">
              <td className="leftSide">
                <table cellPadding="0">
                  <tbody>
                    <tr>
                      <td className="labelContainer">
                        <div className="sectionTitle leftSectionTitle">
                          Scale overview
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="itemImageAndLabelProps">
                        <div className="chosenItemImageContainer">
                          <img
                            className="chosenItemImage"
                            src={image}
                            alt={label}
                          />
                          <div className="imageApproveCheckmark" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="itemImageAndLabelProps">
                        <div className="chosenItemLabel">
                          {label}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="rightSide">
                <div className="confirmedLabelWrapper">
                  <div className="confirmedIcon">
                    <div className="confirmedIconCheckMark">&#10004;</div>
                  </div>
                  <div className="confirmedLabel">Confirmed</div>
                </div>
                {itemPropsTable(weight, price)}
                <div className="actionButtonsWrapper">
                  <Link to={'/'}>
                    <div className="cancelButton">Cancel</div>
                  </Link>
                  <Link
                    to={'/'}
                    onClick={() => addItemToReciept(label, rawPrediction)}
                  >
                    <div className="approveButton">Print</div>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
