// @flow
import React from 'react';
import Header from './header';
import Weight from './weight';
import ItemSelection from './itemSelection';
import './pos_ui.scss';
import Categories from './categories/';
import ItemPhoto from './ItemPhoto';

type Props = {match: Match};

export default ({match, currentImage,makePrediction}: Props) => (
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
                    <td className="cameraContainer">
                      <div>
                        <ItemPhoto currentImage={currentImage} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="topWeightContainer">
                      <Weight onClickHandler={makePrediction}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className="rightSide">
              <table cellPadding="0">
                <tbody>
                  <tr>
                    <td>
                      <ItemSelection match={match}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Categories/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
