import { mount } from '@vue/test-utils'
import SliderPuzzle from '@/components/SliderPuzzle.vue'
import 'jest-localstorage-mock';

jest.useFakeTimers();
let wrapper

describe('SliderPuzzle.vue', () => {
  it('inserts the index of the image to swap when we click on an image', () => {
    wrapper.find('#start-button').trigger('click')
    wrapper.find('img').trigger('click');
    expect(wrapper.vm.indexesToSwap.length).toBeGreaterThan(0);
  })

  it('swaps the image order when 2 images are clicked', () => {
    wrapper.find('#start-button').trigger('click')
    const [firstImage, secondImage] = wrapper.vm.shuffledPuzzleArray;
    wrapper.get('.column:nth-child(1) img').trigger('click');
    wrapper.get('.column:nth-child(2) img').trigger('click');
    expect(wrapper.vm.indexesToSwap.length).toBe(0);
    const [newFirstImage, newSecondImage] = wrapper.vm.shuffledPuzzleArray;
    expect(firstImage).toBe(newSecondImage);
    expect(secondImage).toBe(newFirstImage);
  })

  it('does not allow swap if game has not started', () =>{
    wrapper.get('.column:nth-child(1) img').trigger('click');
    expect(wrapper.vm.indexesToSwap.length).toBe(0);
  })

  it('can handle swap if a tile is double clicked', () => {
    wrapper.find('#start-button').trigger('click')
    const [firstImage] = wrapper.vm.shuffledPuzzleArray
    wrapper.get('.column:nth-child(1) img').trigger('click')
    wrapper.get('.column:nth-child(1) img').trigger('click')
    expect(wrapper.vm.indexesToSwap.length).toBe(0);
    const [newFirstImage] = wrapper.vm.shuffledPuzzleArray;
    expect(firstImage).toBe(newFirstImage)

  })

  it('starts timer when start method is called', () => {
    wrapper.vm.start();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  })

  it('stops timer when stop method is called', () => {
    wrapper.vm.stop();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  })

  it('records record to local storage', () => {
    wrapper = mount(SliderPuzzle, {
      data() {
        return {
          currentDateTime: new Date(),
          startDateTime: new Date()
        }
      }
    })
    wrapper.vm.recordSpeedRecords();
    const { elapsedDiff, elapsedTime } = wrapper.vm;
    const stringifiedRecords = JSON.stringify([{ elapsedTime, elapsedDiff }])
    expect(localStorage.setItem).toHaveBeenCalledWith('records', stringifiedRecords);
  })

  it('can determine when a game is won', () => {
    wrapper = mount(SliderPuzzle, {
      data() {
        return {
          correctPuzzleArray: ['image_part_001.jpg','image_part_002.jpg'],
          shuffledPuzzleArray: ['image_part_001.jpg','image_part_002.jpg']
        }
      }
    })
    expect(wrapper.vm.isWinning).toBe(true)
  })

  it('uploads the leaderboard when game is won', () => {
    wrapper = mount(SliderPuzzle,{
      computed: {
        elapsedTime() {
          return 1
        },
        isWinning() {
          return true
        }
      }
    })
    wrapper.vm.recordSpeedRecords()
    expect(wrapper.emitted()).toHaveProperty('updateLeaderboard')
})

  it('starts timer when Start button is clicked', () => {
    wrapper.get('#start-button').trigger('click');
    expect(setInterval).toHaveBeenCalledTimes(1);
  })

  it('shuffles puzzle when Start button is clicked', () => {
    wrapper.get('#start-button').trigger('click');
    expect(wrapper.vm.correctPuzzleArray).not.toBe(wrapper.vm.shuffledPuzzleArray)
  })

  it('does not allow players to restart multiple times', () => {
    wrapper.get('#start-button').trigger('click')
    wrapper.get('#start-button').trigger('click')
    wrapper.get('#start-button').trigger('click')
    expect(setInterval).toHaveBeenCalledTimes(1);
  })

  it('stops timer when Quit button is clicked', () => {
    wrapper.get('#quit-button').trigger('click');
    expect(clearInterval).toHaveBeenCalledTimes(1);
  })

  it('can properly compare two equal arrays', () => {
    const arr1 = ['1','1','2','2']
    const arr2 = ['1','1','2','2']

    expect(wrapper.vm.areEqualArrays(arr1,arr2)).toBe(true)
  })

  it('can properly compare two different arrays of same size', () => {
    const arr1 = ['1','1','2','2']
    const arr2 = ['1','2','3','4']

    expect(wrapper.vm.areEqualArrays(arr1,arr2)).toBe(false)
  })

  it('can properly compare two arrays of different size', () => {
    const arr1 = ['1','1','2','2']
    const arr2 = ['1','2']

    expect(wrapper.vm.areEqualArrays(arr1,arr2)).toBe(false)
  })

  it('shows the elapsed time', () => {
    wrapper = mount(SliderPuzzle, {
      data() {
        return {
          currentDateTime: new Date(2020, 0, 1, 0, 0, 1),
          startDateTime: new Date(2020, 0, 1, 0, 0, 0),
        }
      }
    });
    expect(wrapper.html()).toContain('00:00:01')
  })

  beforeEach(() => {wrapper = mount(SliderPuzzle)})

  afterEach(() => {
    jest.clearAllMocks();
  });
})