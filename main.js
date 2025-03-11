// PI Estimation
class PiEstimation {
  constructor(canvas, points) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.points = points;
    this.size = canvas.width;
    this.radius = this.size / 2;
  }

  run() {
    this.ctx.clearRect(0, 0, this.size, this.size);
    
    // Draw background
    this.ctx.fillStyle = '#1F2937';
    this.ctx.fillRect(0, 0, this.size, this.size);
    
    // Draw quarter circle
    this.ctx.beginPath();
    this.ctx.arc(0, this.size, this.radius, -Math.PI/2, 0);
    this.ctx.strokeStyle = '#93C5FD';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    let inside = 0;
    
    for (let i = 0; i < this.points; i++) {
      const x = Math.random() * this.radius;
      const y = Math.random() * this.radius;
      
      const distance = Math.sqrt(x * x + y * y);
      const isInside = distance <= this.radius;
      
      this.ctx.beginPath();
      this.ctx.arc(x, this.size - y, 2, 0, 2 * Math.PI);
      this.ctx.fillStyle = isInside ? 'rgba(96, 165, 250, 0.6)' : 'rgba(248, 113, 113, 0.6)';
      this.ctx.fill();
      
      if (isInside) inside++;
    }
    
    const pi = 4 * inside / this.points;
    return pi;
  }
}

// Buffon's Needle
class BuffonNeedle {
  constructor(canvas, needles) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.needles = needles;
    this.lineSpacing = 50;
    this.needleLength = 40;
  }

  run() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.ctx.fillStyle = '#1F2937';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw parallel lines
    for (let y = 0; y <= this.canvas.height; y += this.lineSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.strokeStyle = '#93C5FD';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    let crosses = 0;
    
    for (let i = 0; i < this.needles; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const angle = Math.random() * Math.PI;
      
      const x2 = x + this.needleLength * Math.cos(angle);
      const y2 = y + this.needleLength * Math.sin(angle);
      
      const line1 = Math.floor(y / this.lineSpacing);
      const line2 = Math.floor(y2 / this.lineSpacing);
      
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = line1 !== line2 ? 'rgba(248, 113, 113, 0.8)' : 'rgba(96, 165, 250, 0.8)';
      this.ctx.stroke();
      
      if (line1 !== line2) crosses++;
    }
    
    const pi = (2 * this.needleLength * this.needles) / (crosses * this.lineSpacing);
    return pi;
  }
}

// Area Estimation
class AreaEstimation {
  constructor(canvas, points) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.points = points;
    this.size = canvas.width;
  }

  heart(x, y) {
    const scale = this.size / 20;
    x = x / scale - 10;
    y = y / scale - 10;
    return Math.pow((x*x + y*y - 1), 3) - x*x*y*y*y <= 0;
  }

  run() {
    this.ctx.clearRect(0, 0, this.size, this.size);
    
    // Draw background
    this.ctx.fillStyle = '#1F2937';
    this.ctx.fillRect(0, 0, this.size, this.size);
    
    // Draw heart shape outline
    this.ctx.beginPath();
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.heart(x, y)) {
          this.ctx.rect(x, y, 1, 1);
        }
      }
    }
    this.ctx.strokeStyle = '#93C5FD';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    let inside = 0;
    
    for (let i = 0; i < this.points; i++) {
      const x = Math.random() * this.size;
      const y = Math.random() * this.size;
      
      const isInside = this.heart(x, y);
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
      this.ctx.fillStyle = isInside ? 'rgba(96, 165, 250, 0.6)' : 'rgba(248, 113, 113, 0.6)';
      this.ctx.fill();
      
      if (isInside) inside++;
    }
    
    return inside / this.points * (this.size * this.size);
  }
}

// Monte Carlo Integration
class MonteCarloIntegration {
  constructor(canvas, points) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.points = points;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  function(x) {
    return Math.sin(x) + 1; // Integrating sin(x) + 1 from 0 to π
  }

  run() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background
    this.ctx.fillStyle = '#1F2937';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw function
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x++) {
      const normalizedX = (x / this.width) * Math.PI;
      const y = this.function(normalizedX);
      const canvasY = this.height - (y / 2) * this.height;
      this.ctx.lineTo(x, canvasY);
    }
    this.ctx.strokeStyle = '#93C5FD';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    let inside = 0;
    
    for (let i = 0; i < this.points; i++) {
      const x = Math.random() * Math.PI;
      const y = Math.random() * 2;
      
      const actualY = this.function(x);
      const isUnder = y <= actualY;
      
      const canvasX = (x / Math.PI) * this.width;
      const canvasY = this.height - (y / 2) * this.height;
      
      this.ctx.beginPath();
      this.ctx.arc(canvasX, canvasY, 2, 0, 2 * Math.PI);
      this.ctx.fillStyle = isUnder ? 'rgba(96, 165, 250, 0.6)' : 'rgba(248, 113, 113, 0.6)';
      this.ctx.fill();
      
      if (isUnder) inside++;
    }
    
    const area = (inside / this.points) * (Math.PI * 2);
    return area;
  }
}

// UI Handlers
document.addEventListener('DOMContentLoaded', () => {
  // PI Estimation
  const piCanvas = document.getElementById('piCanvas');
  const piResult = document.getElementById('piResult');
  const runPi = document.getElementById('runPi');
  
  runPi.addEventListener('click', () => {
    const points = parseInt(document.getElementById('piPoints').value);
    const simulation = new PiEstimation(piCanvas, points);
    const result = simulation.run();
    piResult.textContent = `Estimated π: ${result.toFixed(6)} (Actual: ${Math.PI.toFixed(6)})`;
  });

  // Buffon's Needle
  const buffonCanvas = document.getElementById('buffonCanvas');
  const buffonResult = document.getElementById('buffonResult');
  const runBuffon = document.getElementById('runBuffon');
  
  runBuffon.addEventListener('click', () => {
    const needles = parseInt(document.getElementById('needleCount').value);
    const simulation = new BuffonNeedle(buffonCanvas, needles);
    const result = simulation.run();
    buffonResult.textContent = `Estimated π: ${result.toFixed(6)} (Actual: ${Math.PI.toFixed(6)})`;
  });

  // Area Estimation
  const areaCanvas = document.getElementById('areaCanvas');
  const areaResult = document.getElementById('areaResult');
  const runArea = document.getElementById('runArea');
  
  runArea.addEventListener('click', () => {
    const points = parseInt(document.getElementById('areaPoints').value);
    const simulation = new AreaEstimation(areaCanvas, points);
    const result = simulation.run();
    areaResult.textContent = `Estimated Area: ${result.toFixed(2)} square units`;
  });

  // Monte Carlo Integration
  const integrationCanvas = document.getElementById('integrationCanvas');
  const integrationResult = document.getElementById('integrationResult');
  const runIntegration = document.getElementById('runIntegration');
  
  runIntegration.addEventListener('click', () => {
    const points = parseInt(document.getElementById('integrationPoints').value);
    const simulation = new MonteCarloIntegration(integrationCanvas, points);
    const result = simulation.run();
    integrationResult.textContent = `∫(sin(x) + 1)dx from 0 to π ≈ ${result.toFixed(6)}`;
  });

  // Run initial simulations
  runPi.click();
  runBuffon.click();
  runArea.click();
  runIntegration.click();
});