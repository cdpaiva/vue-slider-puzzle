import { mount } from '@vue/test-utils'
import Puzzles from '@/components/Puzzles.vue'

let wrapper

describe('Puzzles.vue', () => {
    it('emit puzzled-changed event when image is clicked', () => {
        // const wrapper = mount(Puzzles)

        wrapper.find('.col img').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('puzzle-changed')
    })
    it('emit puzzled-changed event with the puzzle title when image is clicked', () => {
        // const wrapper = mount(Puzzles)

        wrapper.find('.col img').trigger('click')
        const puzzleChanged = wrapper.emitted('puzzle-changed')
        expect(puzzleChanged[0]).toEqual([wrapper.vm.puzzles[0].title]
        );
    })
    it('needs to have at least one available puzzle', () => {
        // const wrapper = mount(Puzzles)

        expect(wrapper.vm.puzzles.length).toBeGreaterThanOrEqual(1)
    })
})

beforeEach(() => {wrapper = mount(Puzzles)} )
    