#!/usr/bin/env node
import { FILTER_OPTIONS, FILTER_MAPPINGS } from './src/lib/filter-options.js'

// Test our filter options and mappings
console.log('=== Filter Options Test ===\n')

// Test resource types
console.log('Resource Types:')
FILTER_OPTIONS.resourceTypes.forEach((type) => {
  console.log(`  Label: "${type.label}" -> Value: "${type.value}"`)
})

console.log('\nResource Type Mappings:')
console.log('Value to Label:', FILTER_MAPPINGS.resourceType.valueToLabel)
console.log('Label to Value:', FILTER_MAPPINGS.resourceType.labelToValue)

// Test a few key mappings
console.log('\n=== Mapping Tests ===')
console.log('academic (value) -> Label:', FILTER_MAPPINGS.resourceType.valueToLabel['academic'])
console.log(
  'Research Paper (label) -> Value:',
  FILTER_MAPPINGS.resourceType.labelToValue['Research Paper'],
)

// Test countries (should show some differences)
console.log('\nCountry Mapping Examples:')
console.log('Burkina_Faso (value) -> Label:', FILTER_MAPPINGS.country.valueToLabel['Burkina_Faso'])
console.log('Burkina Faso (label) -> Value:', FILTER_MAPPINGS.country.labelToValue['Burkina Faso'])

// Test themes
console.log('\nTheme Mapping Examples:')
const greenValue = FILTER_MAPPINGS.theme.labelToValue['Renewable energy and green economy training']
console.log('Green skills theme - Label to Value:', greenValue)
console.log('Green skills theme - Value to Label:', FILTER_MAPPINGS.theme.valueToLabel[greenValue])

console.log('\n=== Test Complete ===')
