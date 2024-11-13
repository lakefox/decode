package main

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

const (
	CARD_WIDTH  = 40
	CARD_HEIGHT = 30
	MAP_WIDTH   = 11
	MAP_HEIGHT  = 15
)

type Enemy struct {
	Name       string
	Health     int
	Attack     int
	Experience int
}

type Item struct {
	Name   string
	Effect string
	Power  int
}

type Position struct {
	X, Y int
}

type Waypoint struct {
	Position Position
	Symbol   string
	Type     string
}

func main() {
	rand.Seed(time.Now().UnixNano())

	// Generate game content
	enemies := []Enemy{
		{"Goblin Scout", 4, 2, 5},
		{"Shadow Wolf", 6, 3, 8},
		{"Dark Cultist", 5, 4, 7},
		{"Forest Spider", 3, 5, 6},
		{"Skeletal Warrior", 7, 3, 9},
		{"Cave Troll", 8, 4, 10},
		{"Corrupted Fairy", 4, 6, 8},
		{"Spectral Knight", 8, 5, 11},
		{"Venomous Basilisk", 7, 6, 12},
		{"Frost Giant", 9, 4, 13},
		{"Blood Witch", 6, 7, 10},
		{"Ancient Wraith", 5, 8, 11},
		{"Stone Golem", 10, 3, 12},
		{"Plague Rat Swarm", 3, 4, 7},
		{"Mind Flayer", 7, 7, 13},
	}

	items := []Item{
		{"Health Potion", "Heals", 5},
		{"Steel Sword", "Weapon", 3},
		{"Magic Shield", "Defense", 4},
		{"Fire Scroll", "Spell", 6},
		{"Lucky Charm", "Bonus", 2},
		{"Poison Dagger", "Weapon", 4},
		{"Ancient Relic", "Special", 5},
		{"Dragon Scale Armor", "Defense", 7},
		{"Ring of Shadows", "Stealth", 5},
		{"Thunder Staff", "Weapon", 6},
		{"Healing Crystal", "Heals", 4},
		{"Tome of Secrets", "Spell", 7},
		{"Ethereal Cloak", "Defense", 5},
		{"Berserker's Axe", "Weapon", 8},
		{"Charm of Fortune", "Bonus", 3},
		{"Frost Wand", "Spell", 5},
		{"Vampire's Amulet", "Special", 6},
	}

	locations := []string{
		"Misty Forest", "Abandoned Temple", "Dark Cave",
		"Haunted Village", "Ancient Ruins", "Cursed Swamp",
		"Crystal Canyon", "Forgotten Catacombs", "Dragon's Peak",
		"Shadow Realm", "Mystic Garden", "Frozen Wasteland",
		"Demon's Forge", "Sunken City", "Ethereal Plains",
		"Void Nexus", "Elder's Library", "Storm Peaks",
	}

	objectives := []string{
		"defeat the monster", "find the lost artifact",
		"rescue the captive", "break the curse",
		"discover the truth", "seal the portal",
		"recover the treasure", "prevent the ritual",
		"restore the ancient guardian", "banish the demon",
		"unite the kingdoms", "collect the sacred crystals",
		"defeat the corrupt ruler", "awaken the ancient power",
		"stop the plague", "restore the balance",
		"decode the prophecy", "survive the trial",
	}

	// Generate today's adventure
	location := locations[rand.Intn(len(locations))]
	objective := objectives[rand.Intn(len(objectives))]
	startingItems := generateRandomItems(items, 2)
	numEncounters := rand.Intn(3) + 3 // 3-5 encounters
	waypoints := generateWaypoints(MAP_WIDTH, MAP_HEIGHT, numEncounters)
	fullMap := generateMap(MAP_WIDTH, MAP_HEIGHT, waypoints)
	encounters := generateRandomEncounters(enemies, items, numEncounters)

	// Generate all cards
	generateCharacterCard(startingItems)
	fmt.Println("\n" + strings.Repeat("-", CARD_WIDTH) + "\n")

	generateQuestCard(location, objective, fullMap)
	fmt.Println("\n" + strings.Repeat("-", CARD_WIDTH) + "\n")

	for i, enc := range encounters {
		generateEncounterCard(i+1, numEncounters, enc, waypoints[i+1], fullMap)
		fmt.Println("\n" + strings.Repeat("-", CARD_WIDTH) + "\n")
	}

	generateAdventureSummary()
	fmt.Println("\n" + strings.Repeat("=", CARD_WIDTH) + "\n")
}

func generateCharacterCard(startingItems []Item) {
	printCardBorder("CHARACTER SHEET", true)

	content := []string{
		"=== PREVIOUS ADVENTURE ===",
		"Health [___/___max]",
		"Level [___]",
		"XP    [___/100]",
		"",
		"=== CARRIED ITEMS ===",
		"1. ______________ (E:___ P:___)",
		"2. ______________ (E:___ P:___)",
		"3. ______________ (E:___ P:___)",
		"",
		"=== BASE STATS ===",
		"Attack: 5 (+1 per level)",
		"Defense: 3 (+1 per level)",
		"",
		"=== NEW ITEMS ===",
	}

	// Add random starting items
	for _, item := range startingItems {
		content = append(content, fmt.Sprintf("- %s (%s +%d)",
			item.Name, item.Effect, item.Power))
	}

	for _, line := range content {
		printCardLine(line)
	}

	printCardBorder("", false)
}

func sprintFormattedMap(mapData [][]string) []string {
	// Print column numbers
	content := []string{}
	numbers := "    "
	for i := 0; i < len(mapData[0]); i++ {
		if i < 10 {
			numbers += fmt.Sprintf(" %d ", i)
		} else {
			numbers += fmt.Sprintf("%d ", i)
		}
	}
	content = append(content, numbers)

	// Print separator
	content = append(content, "   ------------------------")
	// Print map with row numbers
	for i, row := range mapData {
		line := ""
		line += fmt.Sprintf("%2d |", i)
		for _, cell := range row {
			line += fmt.Sprintf(" %s ", cell)
		}
		content = append(content, line)
	}
	return content
}

func generateQuestCard(location string, objective string, fullMap [][]string) {
	printCardBorder("QUEST MAP", true)

	// Print full map
	content := sprintFormattedMap(fullMap)

	content = append(content, []string{
		"",
		"Legend: S=Start, 1-5=Encounters",
		"       G=Goal, #=Wall, *=Rest",
		"",
		fmt.Sprintf("Quest: Venture into %s", location),
		fmt.Sprintf("Goal: %s", objective),
		fmt.Sprintf("Reward: %d gold and %d XP",
			10+rand.Intn(91), 20+rand.Intn(31)),
		"",
		"Movement:",
		"* Roll d6 for movement points",
		"* Each space = 1 point",
		"* Must reach encounters in order",
		"* No diagonal movement",
	}...)

	for _, line := range content {
		printCardLine(line)
	}

	printCardBorder("", false)
}

func generateEncounterCard(num int, total int, encounter string, waypoint Waypoint, fullMap [][]string) {
	title := fmt.Sprintf("ENCOUNTER %d/%d", num, total)
	printCardBorder(title, true)

	// Generate mini-map centered on encounter
	miniMap := generateMiniMap(fullMap, waypoint.Position, 5)

	// Print mini-map
	for _, line := range miniMap {
		// printCardLine(strings.Repeat("X", len(strings.TrimRight(line, " "))))
		printCardLine(strings.TrimRight(line, " "))
	}

	content := []string{
		""}
	content = append(content, strings.Split(encounter, "\n")...)
	content = append(content, []string{
		"",
		"Combat:",
		"* Roll d6 + your attack vs enemy health",
		"* Success = gain reward",
		"* Failure = lose 3 health or use item",
		"",
		"Status:",
		"Current Health: ___",
		"Items Used: ________________",
		"",
	}...)

	for _, line := range content {
		printCardLine(line)
	}

	printCardBorder("", false)
}

func generateRandomEncounters(enemies []Enemy, items []Item, count int) []string {
	encounters := make([]string, count)

	for i := 0; i < count; i++ {
		enemy := enemies[rand.Intn(len(enemies))]
		item := items[rand.Intn(len(items))]

		switch rand.Intn(3) {
		case 0:
			encounters[i] = fmt.Sprintf("Enemy: %s\nHealth: %d\nAttack: %d\nReward: %s (%s +%d)",
				enemy.Name, enemy.Health, enemy.Attack,
				item.Name, item.Effect, item.Power)
		case 1:
			encounters[i] = fmt.Sprintf("Challenge: Avoid the %s's trap\nDifficulty: Roll 4+ to succeed\nReward: %s (%s +%d)",
				enemy.Name, item.Name, item.Effect, item.Power)
		case 2:
			encounters[i] = fmt.Sprintf("Choice:\n* Fight %s (Roll 5+ to win)\n* Sneak past (Roll 3+, no reward)\nReward: %s (%s +%d)",
				enemy.Name, item.Name, item.Effect, item.Power)
		}
	}

	return encounters
}

func generateRandomItems(items []Item, count int) []Item {
	result := make([]Item, count)
	usedIndices := make(map[int]bool)

	for i := 0; i < count; i++ {
		for {
			index := rand.Intn(len(items))
			if !usedIndices[index] {
				result[i] = items[index]
				usedIndices[index] = true
				break
			}
		}
	}

	return result
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func generateMap(width, height int, waypoints []Waypoint) [][]string {
	// Initialize empty map
	mapData := make([][]string, height)
	for i := range mapData {
		mapData[i] = make([]string, width)
		for j := range mapData[i] {
			mapData[i][j] = "."
		}
	}

	// Add random walls
	wallDensity := (width * height) / 25
	for i := 0; i < wallDensity; i++ {
		wallLength := rand.Intn(3) + 2
		x := rand.Intn(width)
		y := rand.Intn(height)
		horizontal := rand.Intn(2) == 0

		for j := 0; j < wallLength; j++ {
			if horizontal && x+j < width {
				mapData[y][x+j] = "#"
			} else if !horizontal && y+j < height {
				mapData[y+j][x] = "#"
			}
		}
	}

	// Ensure paths between waypoints
	for i := 0; i < len(waypoints)-1; i++ {
		if waypoints[i].Type != "rest" {
			clearPath(mapData, waypoints[i].Position, waypoints[i+1].Position)
		}
	}

	// Add waypoints
	for _, wp := range waypoints {
		mapData[wp.Position.Y][wp.Position.X] = wp.Symbol
	}

	return mapData
}

func clearPath(mapData [][]string, start, end Position) {
	// Create a more natural path between points
	currentX := start.X
	currentY := start.Y

	if rand.Intn(2) == 0 {
		// Horizontal then vertical
		for x := min(start.X, end.X); x <= max(start.X, end.X); x++ {
			if mapData[currentY][x] == " " || mapData[currentY][x] == "." {
				mapData[currentY][x] = "."
			}
		}
		for y := min(currentY, end.Y); y <= max(currentY, end.Y); y++ {
			if mapData[y][end.X] == " " || mapData[y][end.X] == "." {
				mapData[y][end.X] = "."
			}
		}
	} else {
		// Vertical then horizontal
		for y := min(start.Y, end.Y); y <= max(start.Y, end.Y); y++ {
			if mapData[y][currentX] == " " || mapData[y][currentX] == "." {
				mapData[y][currentX] = "."
			}
		}
		for x := min(currentX, end.X); x <= max(currentX, end.X); x++ {
			if mapData[end.Y][x] == " " || mapData[end.Y][x] == "." {
				mapData[end.Y][x] = "."
			}
		}
	}
}

func generateWaypoints(width, height int, numEncounters int) []Waypoint {
	waypoints := make([]Waypoint, 0)
	usedPositions := make(map[string]bool)

	// Helper function to check if position is near boundary
	isNearBoundary := func(x, y int, margin int) bool {
		return x < margin || x >= width-margin || y < margin || y >= height-margin
	}

	// Helper function to get a unique random position
	getUniquePosition := func(leftSide bool) Position {
		for {
			var x int
			if leftSide {
				x = rand.Intn(width / 4)
			} else {
				x = width - 1 - rand.Intn(width/4)
			}
			y := rand.Intn(height)
			pos := fmt.Sprintf("%d,%d", x, y)
			if !usedPositions[pos] && !isNearBoundary(x, y, 1) {
				usedPositions[pos] = true
				return Position{X: x, Y: y}
			}
		}
	}

	// Add start point (left side)
	startPos := getUniquePosition(true)
	waypoints = append(waypoints, Waypoint{
		Position: startPos,
		Symbol:   "S",
		Type:     "start",
	})

	// Add encounter points in a progressive pattern
	for i := 1; i <= numEncounters; i++ {
		x := (width * i) / (numEncounters + 1)
		y := rand.Intn(height)
		pos := Position{X: x, Y: y}
		for isNearBoundary(pos.X, pos.Y, 1) || usedPositions[fmt.Sprintf("%d,%d", pos.X, pos.Y)] {
			pos.Y = rand.Intn(height)
		}
		usedPositions[fmt.Sprintf("%d,%d", pos.X, pos.Y)] = true
		waypoints = append(waypoints, Waypoint{
			Position: pos,
			Symbol:   fmt.Sprintf("%d", i),
			Type:     "encounter",
		})
	}

	// Add goal point (right side)
	goalPos := getUniquePosition(false)
	waypoints = append(waypoints, Waypoint{
		Position: goalPos,
		Symbol:   "G",
		Type:     "goal",
	})

	// Add rest points
	numRestPoints := rand.Intn(3) + 2
	for i := 0; i < numRestPoints; i++ {
		for {
			x := rand.Intn(width)
			y := rand.Intn(height)
			pos := fmt.Sprintf("%d,%d", x, y)
			if !usedPositions[pos] && !isNearBoundary(x, y, 1) {
				waypoints = append(waypoints, Waypoint{
					Position: Position{X: x, Y: y},
					Symbol:   "*",
					Type:     "rest",
				})
				usedPositions[pos] = true
				break
			}
		}
	}

	return waypoints
}

func generateMiniMap(fullMap [][]string, center Position, radius int) []string {
	result := []string{
		"Local Area:",
		fmt.Sprintf("Center: (%d,%d)", center.X, center.Y),
	}

	startY := max(0, center.Y-radius)
	endY := min(len(fullMap)-1, center.Y+radius)
	startX := max(0, center.X-radius)
	endX := min(len(fullMap[0])-1, center.X+radius)

	// Add coordinate header
	header := "    "
	for x := startX; x <= endX; x++ {
		header += fmt.Sprintf("%2d ", x)
	}
	result = append(result, header)

	// Add separator
	result = append(result, "   "+strings.Repeat("-", (endX-startX+1)*3))

	// Add map rows with consistent spacing
	for y := startY; y <= endY; y++ {
		row := fmt.Sprintf("%2d |", y)
		for x := startX; x <= endX; x++ {
			row += fmt.Sprintf(" %s ", fullMap[y][x])
		}
		result = append(result, row)
	}

	return result
}

func printCardLine(content string) {
	maxWidth := CARD_WIDTH - 4 // Subtract 4 for "║ " and " ║"

	// Count leading spaces
	leadingSpaces := 0
	for i, c := range content {
		if c != ' ' {
			leadingSpaces = i
			break
		}
	}

	if len(content) <= maxWidth {
		// If content fits, print normally
		gap := (maxWidth - len(content)) + 1
		padding := strings.Repeat(" ", gap)
		fmt.Printf("║ %s%s║\n", content, padding)
		return
	}

	// Create the leading space string
	indent := strings.Repeat(" ", leadingSpaces)

	// Split content into words, preserving the first indent
	words := strings.Fields(content)
	currentLine := indent // Start with indent

	for i, word := range words {
		// For first word, we already added the indent
		if i == 0 {
			currentLine += word
			continue
		}

		// Check if adding this word would exceed maxWidth
		if len(currentLine)+len(word)+1 <= maxWidth {
			currentLine += " " + word
		} else {
			// Print current line and start new line
			gap := (maxWidth - len(currentLine)) + 1
			padding := strings.Repeat(" ", gap)
			fmt.Printf("║ %s%s║\n", currentLine, padding)
			// Start new line with same indentation
			currentLine = indent + word
		}
	}

	// Print final line if there's anything left
	if currentLine != "" {
		gap := (maxWidth - len(currentLine)) + 1
		padding := strings.Repeat(" ", gap)
		fmt.Printf("║ %s%s║\n", currentLine, padding)
	}
}

func printCardBorder(title string, isTop bool) {
	if isTop {
		fmt.Println("╔" + strings.Repeat("═", CARD_WIDTH-2) + "╗")
		if title != "" {
			padding := CARD_WIDTH - len(title) - 4
			leftPad := padding / 2
			rightPad := padding - leftPad
			fmt.Printf("║%s%s%s║\n",
				strings.Repeat(" ", leftPad+1),
				title,
				strings.Repeat(" ", rightPad+1))
			fmt.Println("║" + strings.Repeat("─", CARD_WIDTH-2) + "║")
		}
	} else {
		fmt.Println("╚" + strings.Repeat("═", CARD_WIDTH-2) + "╝")
	}
}

func generateAdventureSummary() {
	printCardBorder("ADVENTURE SUMMARY", true)
	content := []string{
		"=== SUMMARY ===",
		"Gold Collected: __",
		"XP Gained: __",
		"Enemies Defeated: __",
		"Items Collected: __",
		"",
		"=== PLAN FOR NEXT ADVENTURE ===",
		"Health [_____/_____]",
		"Level [___] XP [___/100]",
		"",
		"Equipped Items:",
		"1. __________________________",
		"2. __________________________",
	}

	for _, line := range content {
		printCardLine(line)
	}

	printCardBorder("", false)
}
