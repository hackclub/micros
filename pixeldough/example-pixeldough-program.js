return {
    size: [300, 300],
    forEachPixel(x, y, rgba) {
        let dx = x - 0.5,
            dy = y - 0.5,
            dist = Math.sqrt(dx*dx + dy*dy),
            rad = Math.atan2(dy, dx) + dist * 3.14;

        return sample(
            Math.sin(rad) * dist + 0.5,
            Math.cos(rad) * dist + 0.5,
        );
    }
}
