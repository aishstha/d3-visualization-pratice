import React from 'react';
import { connect } from 'react-redux';
import { select, selectAll, mouse } from 'd3-selection';
import { transition } from 'd3-transition';
import { number } from 'localization';

class Line extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    const node = this.ref.current;
    const { scales, initialData, lineGenerator } = this.props;
    const { xScale, yScale } = scales;

    select(node)
      .append('path')
      .datum(initialData)
      .attr('id', 'line')
      .attr('stroke', '#ECC417')
      .attr('stroke-width', 3)
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    select(node)
      .selectAll('.dot')
      .data(initialData)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('stroke', '#ECC417')
      .attr('stroke-width', '2')
      .attr('fill', '#333')
      .attr('r', 3)
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScale(d.count));

    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const {
      lineGenerator, scales, data, selectedLanguage,
    } = this.props;
    const { xScale, yScale } = scales;
    const t = transition().duration(1000);

    const line = select('#line');
    const dot = selectAll('.dot');

    line
      .datum(data)
      .transition(t)
      .attr('d', lineGenerator);

    dot
      .on('mouseenter', (d, i, nodes) => {
        const elem = document.getElementById('tooltip-line');
        const mouseValue = mouse(nodes[i]);
        elem.innerHTML = `
                        <div class="tooltip">
                        <div class="tooltip-arrow"></div>
                         <div>
                          <span class="total-count">${number(d && d.count)}</span>
                          <span class="title">${
  selectedLanguage === 'en' ? 'Projects' : 'परियोजना'
}</span>
                         </div>
                         </div>
              `;

        elem.style.cssText = 'opacity:1;  position: absolute';
        elem.style.display = 'block';
        elem.style.left = `${mouseValue[0] - 5}px`;
        elem.style.top = `${mouseValue[1] + 40}px`;
      })
      .on('mouseleave', () => {
        const elem = document.getElementById('tooltip-line');
        elem.style.display = 'none';
      })
      .data(data)
      .transition(t)
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScale(d.count));
  }
  render() {
    return <g className="line-group" ref={this.ref} />;
  }
}

const mapStateToProps = state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage,
});

export default connect(mapStateToProps)(Line);
