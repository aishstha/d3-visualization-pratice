import React from "react";
import styled from "styled-components";
import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import { number } from "localization";

let geojson;

import(`../geojson/geojson.json`).then(res => (geojson = res));

class MapProjects extends React.Component {
  state = {
    parentWidth: 0
  };
  getColor = obj => {
    const { Name } = obj.properties;
    const { data } = this.props;

    if (data && data.find(d => `road ${d}` === Name)) {
      return "#ecc417";
    }
    return "#3b4555";
  };

  onMouseLeave = e => {
    select(e.target)
      .attr("stroke", "#0e1724")
      .attr("stroke-width", "1");
  };

  onMouseEnter = e => {
    // stroke on road selection
    select(e.target)
      .attr("stroke", "white")
      .attr("stroke-width", "2");
  };

  render() {
    const { width } = this.props;
    const height = width;
    const projection = geoMercator().fitExtent(
      [[0, 0], [width * 0.9, height * 0.9]],
      geojson
    );
    const path = geoPath().projection(projection);

    return (
      <MapSection className="map">
        <div>
          <svg width={width} height={height}>
            <g className="geojson-layer">
              {geojson.features.map(obj => (
                <path
                  key={obj.properties.Name}
                  d={path(obj)}
                  fill={this.getColor(obj)}
                  stroke="#0e1724"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  onMouseMove={e => {
                    const { data } = this.props;

                    if (
                      data &&
                      data.find(d => `road ${d}` === obj.properties.Name)
                    ) {
                      const elem = document.getElementById(
                        "tooltip-map-detail"
                      );
                      elem.innerHTML = `
                              <div class="tooltip">
                              <div class="tooltip-arrow"></div>
                                <div>
                                  <span class="title">
                                  road: 
                              </span>
                                  <span class="total-count">${number(
                        obj.properties.Name.replace("road ", "")
                      )}</span>
                                </div>
                               </div>
                    `;

                      elem.style.cssText = "opacity:1;  position: absolute";
                      elem.style.display = "block";
                      elem.style.left = `${e.pageX - 60}px`;
                      elem.style.top = `${e.pageY + 25}px`;
                    }
                  }}
                  onMouseEnter={e => {
                    this.onMouseEnter(e);
                  }}
                  onMouseLeave={e => {
                    const elem = document.getElementById("tooltip-map-detail");
                    elem.style.display = "none";
                    this.onMouseLeave(e);
                  }}
                />
              ))}
            </g>
          </svg>
          <div id="tooltip-map-detail" />
        </div>
      </MapSection>
    );
  }
}

const MapSection = styled.div`
  padding-top: 10px;
  width: 100%;
`;
export default MapProjects;
