let audioCtx, analyser, dataArray;

export function setupAudio(stream) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.8;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
}

export function getProcessedData() {
    if (!analyser || !dataArray) return null;
    
    analyser.getByteFrequencyData(dataArray);
    
    // Use only the first 60% of data (relevant bass/mid/high frequencies)
    const relevantLength = Math.floor(dataArray.length * 0.6);
    const relevantData = new Uint8Array(relevantLength);
    
    for (let i = 0; i < relevantLength; i++) {
        relevantData[i] = dataArray[i];
    }
    
    // Adaptive normalization
    const maxValue = Math.max(...relevantData);
    
    if (maxValue > 0 && maxValue < 200) {
        const boostFactor = 200 / maxValue;
        for (let i = 0; i < relevantData.length; i++) {
            relevantData[i] = Math.min(255, relevantData[i] * boostFactor);
        }
    }
    
    // Additional boost for higher frequencies (from 50%)
    for (let i = Math.floor(relevantLength * 0.5); i < relevantLength; i++) {
        const boostFactor = 1 + ((i - relevantLength * 0.5) / (relevantLength * 0.5)) * 1.5;
        relevantData[i] = Math.min(255, relevantData[i] * boostFactor);
    }
    
    return relevantData;
}