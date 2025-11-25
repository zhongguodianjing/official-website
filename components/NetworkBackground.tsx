
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../contexts/ThemeContext';

const NetworkBackground: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .style('z-index', 0)
      .style('pointer-events', 'none');

    // Reduced node count slightly for cleaner look
    const nodes = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      baseR: Math.random() * 2 + 1,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const linkGroup = svg.append('g').attr('class', 'links');
    const nodeGroup = svg.append('g').attr('class', 'nodes');

    let linkSelection = linkGroup.selectAll('line');
    
    // Adjust colors based on theme
    const primaryColor = theme === 'dark' ? '#14b8a6' : '#0d9488'; // Cyan
    const secondaryColor = theme === 'dark' ? '#d946ef' : '#c026d3'; // Purple
    const opacity = theme === 'dark' ? 0.1 : 0.4; // Darker particles in light mode for visibility
    
    const nodeSelection = nodeGroup.selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', d => d.r)
      // Colors: Cyan and Fuchsia
      .attr('fill', (d, i) => i % 3 === 0 ? secondaryColor : primaryColor) 
      .attr('opacity', opacity);

    const simulation = d3.forceSimulation(nodes as any)
      .velocityDecay(0)
      .alphaTarget(0)
      .on('tick', () => {
        nodes.forEach(node => {
          node.x += node.vx;
          node.y += node.vy;

          const dx = node.x - mouseX;
          const dy = node.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            node.x += (dx / dist) * force * 1.5;
            node.y += (dy / dist) * force * 1.5;
            node.r = node.baseR * (1 + force * 1.5);
          } else {
            node.r = node.baseR;
          }

          if (node.x < -50) node.x = width + 50;
          if (node.x > width + 50) node.x = -50;
          if (node.y < -50) node.y = height + 50;
          if (node.y > height + 50) node.y = -50;
        });

        const dynamicLinks: { source: typeof nodes[0]; target: typeof nodes[0]; dist: number }[] = [];
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 130) {
              dynamicLinks.push({ source: nodes[i], target: nodes[j], dist: distance });
            }
          }
        }

        linkSelection = linkGroup.selectAll('line').data(dynamicLinks);
        
        linkSelection.exit().remove();
        
        const linksEnter = linkSelection.enter().append('line')
          .attr('stroke-width', 0.5);
          
        linkSelection.merge(linksEnter as any)
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)
          .attr('stroke', d => {
            const distOpacity = 1 - d.dist / 130;
            return `rgba(${theme === 'dark' ? '20, 184, 166' : '13, 148, 136'}, ${distOpacity * (theme === 'dark' ? 0.1 : 0.2)})`; 
          });

        nodeSelection
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', d => d.r);
      });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      simulation.stop();
      svg.selectAll('*').remove();
    };
  }, [theme]);

  return <svg ref={svgRef} className="absolute inset-0 w-full h-full" />;
};

export default NetworkBackground;
