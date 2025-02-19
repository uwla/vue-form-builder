import { expect, test } from "vitest"
import { errors, messages, wrapper } from "./common"

test("it shows errors", async () => {
    await wrapper.setProps({ errors })

    const errorsArray = Object.values(errors)
    const feedbacks = wrapper.findAll(`.vfb-feedback-invalid.visible`)

    expect(feedbacks).toHaveLength(errorsArray.length)

    for (let i = 0; i < feedbacks.length; i += 1)
        expect(feedbacks[i].text()).toBe(errorsArray[i])
})

test("it hides errors", async () => {
    await wrapper.setProps({ errors: {} })
    expect(wrapper.findAll(`.vfb-feedback-invalid.visible`)).toHaveLength(0)
})

test("it shows messages", async () => {
    await wrapper.setProps({ messages })

    const messagesArray = Object.values(messages)
    const feedbacks = wrapper.findAll(`.vfb-feedback-valid.visible`)

    expect(feedbacks).toHaveLength(messagesArray.length)

    for (let i = 0; i < feedbacks.length; i += 1)
        expect(feedbacks[i].text()).toBe(messagesArray[i])
})

test("it hides messages", async () => {
    await wrapper.setProps({ messages: {} })
    expect(wrapper.findAll(`.vfb-feedback-valid.visible`)).toHaveLength(0)
})
