import React from "react";
import styled from "styled-components";
import { scaleQuantize } from "d3-scale";
import { connect } from "react-redux";
import { setSelectedroad } from "details/projects-stats/actions";
import { select } from "d3-selection";
import { geoMercator, geoPath } from "d3-geo";
import isEqual from "lodash.isequal";
import { withRouter } from "react-router-dom";
import { number, formattedCurrency } from "localization";
import geojson from '../geojson/geojson.json'

const municipalities = [{name: "road", title_en: "Road City", title_ne: "", no_of_roads: 19}];


const colorScale = val =>
  scaleQuantize()
    .domain([0, val])
    .range(["#1b2738", "#253a59", "#204884", "#1b60c8"]);

let debounce;
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentWidth: 0
    };
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.fitParentContainer();
    window.addEventListener("resize", this.fitParentContainer);
  }
  fitParentContainer = () => {
    const { parentWidth } = this.state;

    const currentParentWidth =
      this.ref.current && this.ref.current.getBoundingClientRect().width;

    const shouldResize = parentWidth !== currentParentWidth;
    if (shouldResize) {
      this.setState({
        parentWidth: currentParentWidth
      });
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    const { data, width, selectedLanguage } = nextProps;
    const { parentWidth } = nextState;

    return (
      !isEqual(data, this.props.data) ||
      width !== this.props.width ||
      parentWidth !== this.props.parentWidth ||
      selectedLanguage !== this.props.selectedLanguage
    );
  }
  onMouseEnter = (e, d) => {
    const { Name } = d.properties;

    // stroke on road selection
    select(e.target)
      .attr("stroke", "white")
      .attr("stroke-width", "2");

    // replace road name 'road 1' with number '1'
    const road = parseInt(Name.replace("road ", ""), 10);
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      this.props.dispatchSelectedroad(road);
    }, 500);

    // display cursor only on selected road
    const checkroad = this.props.data.find(
      obj => parseInt(obj.road, 10) === road
    );
    if (checkroad) {
      select(e.target).attr("cursor", "pointer");
    }
  };
  onMouseLeave = e => {
    select(e.target)
      .attr("stroke", "#0e1724")
      .attr("stroke-width", "1");

    clearTimeout(debounce);
    debounce = setTimeout(() => {
      this.props.dispatchSelectedroad("all");
    }, 500);
  };
  getColor = (d, color) => {
    const { Name } = d.properties;
    const { data } = this.props;
    const value = data
      .filter(obj => `road ${obj.road}` === Name)
      .map(obj => obj.value);

    const colorValue = color(value[0]);
    if (colorValue) {
      return colorValue.toString();
    }
    return "#121f2e";
  };
  getValue = d => {
    const { Name } = d.properties;
    const { data } = this.props;
    const value = data
      .filter(obj => `road ${obj.road}` === Name)
      .map(obj => obj.value);

    return value[0];
  };
 
  getTotalroads = () => {
    const { municipality } = this.props;
    const currentMunicipality = municipalities.find(
      val => val.name === municipality.title_en
    );
    return currentMunicipality.no_of_roads;
  };

  render() {
    const { data, selectedDropDown } = this.props;
    const { parentWidth } = this.state;

    const height = parentWidth;
    const projection = geoMercator().fitExtent(
      [[0, 0], [parentWidth * 0.9, height * 0.9]],
      geojson
    );
    const path = geoPath().projection(projection);

    const maxProjectNumber = Math.max(
      ...data.filter(d => d.road <= this.getTotalroads()).map(d => d.value)
    );

    const color = colorScale(maxProjectNumber);

    if (!geojson) {
      return null;
    }

    return (
      <MapSection className="map" innerRef={this.ref}>
        <div>
          <svg width={parentWidth} height={height}>
            <g className="geojson-layer">
              {geojson.features.map(d => (
                <path
                  key={d.properties.Name}
                  d={path(d)}
                  fill={this.getColor(d, color)}
                  stroke="#0e1724"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  onMouseMove={e => {
                    const value = this.getValue(d);

                    const elem = document.getElementById("tooltip-map");

                    let title;

                    if (selectedDropDown === "budget") {
                      title = "$ ";
                    } else {
                      title = value > 1 ? "Projects: " : "Project: ";
                    }
                    elem.innerHTML = `
                              <div class="tooltip">
                              <div class="tooltip-arrow"></div>
                                <div>
                                  <span class="title">Road: 
                        
                      </span>
                                  <span class="total-count">${number(
                        d.properties.Name.replace("road ", "")
                      )}</span>
                                </div>
                                <div>
                                  <span class="title">${value ? title : ""
                      }</span>
                                  <span class="total-count"> ${formattedCurrency(
                        value
                      ) || "N/A"}</span>
                                </div>
                              </div>
                    `;

                    elem.style.cssText = "opacity:1;  position: absolute";
                    elem.style.display = "block";
                    elem.style.left = `${e.pageX - 210}px`;
                    elem.style.top = `${e.pageY - 170}px`;
                  }}
                  onMouseEnter={e => {
                    this.onMouseEnter(e, d);
                  }}
                  onMouseLeave={e => {
                    const elem = document.getElementById("tooltip-map");
                    elem.style.display = "none";
                    this.onMouseLeave(e);
                  }}
                />
              ))}
            </g>
          </svg>
        </div>
        <div id="tooltip-map" />
      </MapSection>
    );
  }
}

const MapSection = styled.div`
  /* width: 100%; */
`;
const mapStateToProps = state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage,
  fiscalYear: state.fiscalYearReducers.selectedFiscalYear,
});
const mapDispatchToProps = dispatch => ({
  dispatchSelectedroad: selectedroad => dispatch(setSelectedroad(selectedroad))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Map)
);
