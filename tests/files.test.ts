import { castValue } from '../src/helpers'
import { model, wrapper } from './common'
import VfbFile from '../src/components/VfbFile.vue'

let fileInput : any

test('it has file input', () => {
    fileInput = wrapper.findComponent(VfbFile)
    expect(fileInput.exists()).toBe(true)
    expect(fileInput.attributes('name')).toBe('photo')
})

test('it gets the file', async () => {
    await wrapper.setProps({ model })

    // this is the file data
    const data = [] as BlobPart[];
    for (let i = 0; i < 512; i += 1)
        data.push(65 as unknown as BlobPart);

    // this is the file we mock
    const file = new File(data, 'a.txt')

    // we mock file upload
    await fileInput.vm.handleInput({ target: { files: [file] }})

    // mock form submission
    await wrapper.trigger('submit')

    // get the emitted submit events
    const emitted = wrapper.emitted('submit') as any

    // get the last submit event
    const lastEvent = emitted[emitted.length - 1]
    
    // it should not be null
    expect(lastEvent).toBeTruthy()

    // get the payload
    const payload = lastEvent[0]
   
    // it should be form data
    expect(payload instanceof FormData).toBe(true)

    // it should have a file in it
    expect(payload.get('photo')).toMatchObject(file)

    // it should also contain other data
    for (let key of Object.keys(model)) {
        let val = model[key]
        let payloadVal = null

        // arrays are dealt differently in form data
        if (Array.isArray(val))
            payloadVal = payload.getAll(`${key}[]`)
        else
            payloadVal = payload.get(key)

        // need to cast boolean values because Boolean in FormData is String
        payloadVal = castValue(payloadVal)

        // values should match
        expect(payloadVal).toEqual(val)
    }
})