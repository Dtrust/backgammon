export type BoardMetricsType = {
    vbW: number;
    vbH: number;
    padding: number;
    barWidth: number;
    contentWidth: number;
    pointsAreaWidth: number;
    pointWidth: number;
    leftStart: number;
    rightStart: number;
    topBaseY: number;
    bottomBaseY: number;
    pocketR: number;
    tipYTop: number;
    tipYBottom: number;
};

export const getBoardGeometry = (vbW = 1000, vbH = 800): BoardMetricsType => {
    const padding = 60;
    const barWidth = 40;
    const contentWidth = vbW - padding * 2;
    const pointsAreaWidth = contentWidth - barWidth;
    const pointWidth = pointsAreaWidth / 12;
    const leftStart = padding;
    const rightStart = padding + 6 * pointWidth + barWidth;
    const topBaseY = padding - 20;
    const bottomBaseY = vbH - padding + 20;
    const pocketR = Math.min(pointWidth * 0.36, 22);
    const tipYTop = vbH / 2 - 18;
    const tipYBottom = vbH / 2 + 18;

    return {
        vbW,
        vbH,
        padding,
        barWidth,
        contentWidth,
        pointsAreaWidth,
        pointWidth,
        leftStart,
        rightStart,
        topBaseY,
        bottomBaseY,
        pocketR,
        tipYTop,
        tipYBottom,
    };
};
