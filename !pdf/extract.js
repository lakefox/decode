class Extract {
    constructor(data) {
        this.data = data;
    }
    lists() {
        return this;
    }
    tables() {
        return this;
    }
    numbers() {
        return this;
    }
    names() {
        return this;
    }
    addresses() {
        return this;
    }
    emails() {
        return this;
    }
    phoneNumbers() {
        return this;
    }
    text() {
        return this;
    }
}

// let finder = Extract("");

// finder.tables().contain("name", "address").get();
// finder.lists().contain("name", "address").get();
// finder.text().contain("name", "address").get();
// finder.addresses();
// finder.tables().contain(/\[0-9]+[A-Za-z]/);

function extract(data) {
    let points = convertTextObjects(data);
    console.log(points);

    // Calculate average distance between text points
    let totalDistance = 0;
    let count = 0;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            totalDistance += Math.sqrt(
                Math.pow(points[i].x - points[j].x, 2) +
                    Math.pow(points[i].y - points[j].y, 2)
            );
            count++;
        }
    }
    const averageDistance = totalDistance / count;

    // Set threshold as a fraction of the average distance
    const thresholdFraction = 0.2; // Adjust this value based on desired tightness
    const threshold = averageDistance * thresholdFraction;

    // Array to hold groups of text
    let groups = [];

    for (let a = 0; a < points.length; a++) {
        const pointA = points[a];
        // Check if pointA belongs to any existing group
        let foundGroup = false;
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            for (let b = 0; b < group.length; b++) {
                const pointB = group[b];
                // Calculate distance between pointA and pointB
                const distance = Math.sqrt(
                    Math.pow(pointA.x - pointB.x, 2) +
                        Math.pow(pointA.y - pointB.y, 2)
                );
                if (distance <= threshold) {
                    // Add pointA to the current group
                    group.push(pointA);
                    foundGroup = true;
                    break;
                }
            }
            if (foundGroup) break;
        }
        // If pointA doesn't belong to any existing group, create a new group
        if (!foundGroup) {
            groups.push([pointA]);
        }
    }

    // Merge text within the same group if they are on the same y-coordinate
    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        for (let j = 0; j < group.length - 1; j++) {
            const currentPoint = group[j];
            const nextPoint = group[j + 1];
            if (Math.abs(currentPoint.y - nextPoint.y) < 4) {
                // Merge text if the y-coordinates are the same
                currentPoint.str += " " + nextPoint.str;
                // Remove the next point from the group
                group.splice(j + 1, 1);
                j--; // Adjust the index after removing the next point
            }
        }
    }

    // Output the groups
    console.log(groups);
}

function convertTextObjects(textObjects) {
    return textObjects.map((textObject) => {
        const transform = textObject.transform;
        const width = textObject.width;
        const height = textObject.height;
        const x = transform[4];
        const y = transform[5];
        return { width, height, x, y, str: textObject.str };
    });
}
