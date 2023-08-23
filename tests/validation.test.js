import { errors, messages, model, validationErrors, validationRules, wrapper } from './common'

test('it validates on input', async () => {
    await wrapper.setProps({
        model: model,
        validateOnInput: true,
        validation: validationRules,
        errors: errors,
        messages: messages,
        clearFeedbackOnInput: false,
    })
    wrapper.vm.setupFeedback()

    let invalidFeedbacks = () => wrapper.findAll('.vfb-feedback-invalid.visible')
    let invalidFeedbackText = () => wrapper.find('.vfb-feedback-invalid.visible').text()
    let validFeedbackText = (n) => wrapper.find(`[name=${n}]~.vfb-feedback .visible`).text()

    // ─────────────────────────────────────────────────────────────────────────
    // Text field

    // short name
    await wrapper.find('[name=name]').setValue('Le')
    expect(invalidFeedbackText()).toBe(validationErrors['name']['short'])

    // long name
    let name = 'Katelynn Medhurst Michale Sporer Leatha Stiedemann'
    await wrapper.find('[name=name]').setValue(name)
    expect(invalidFeedbackText()).toBe(validationErrors['name']['long'])

    // set valid name
    await wrapper.find('[name=name]').setValue('John Doe')
    expect(invalidFeedbacks()).toHaveLength(0)
    expect(validFeedbackText('name')).toBe(messages['name'])

    // ─────────────────────────────────────────────────────────────────────────
    // Textarea field

    // set invalid bio
    await wrapper.find('[name=bio]').setValue("Hi, I'm John")
    expect(invalidFeedbackText()).toBe(validationErrors['bio'])

    // set valid bio
    await wrapper.find('[name=bio]').setValue("Hi, hello, I'm John")
    expect(invalidFeedbacks()).toHaveLength(0)
    expect(validFeedbackText('bio')).toBe(messages['bio'])

    // ─────────────────────────────────────────────────────────────────────────
    // Single checkbox field

    // invalid agreement
    await wrapper.find('[name=agree]').setChecked(false)
    expect(invalidFeedbackText()).toBe(errors['agree'])

    // valid agreement
    await wrapper.find('[name=agree]').setChecked(true)
    expect(invalidFeedbacks()).toHaveLength(0)
    expect(validFeedbackText('agree')).toBe(messages['agree'])

    // ─────────────────────────────────────────────────────────────────────────
    // Checkboxes field

    // checkboxes
    let checkboxes = wrapper.findAll('[name=fruits]')

    // first reset everything
    for (let i = 0; i < checkboxes.length; i += 1)
        await checkboxes.at(i).setChecked(false)

    // check all
    for (let i = 0; i < checkboxes.length; i += 1)
        await checkboxes.at(i).setChecked(true)
    expect(invalidFeedbackText()).toBe(validationErrors['fruits']['many'])

    // uncheck all
    for (let i = 0; i < checkboxes.length; i += 1)
        await checkboxes.at(i).setChecked(false)
    expect(invalidFeedbackText()).toBe(validationErrors['fruits']['few'])

    // now, make it valid
    await checkboxes.at(0).setChecked()
    await checkboxes.at(1).setChecked()
    expect(invalidFeedbacks()).toHaveLength(0)

    // expect the successful message to match
    // it is needed to use custom selector
    expect(wrapper.find('.vfb-checkboxes~.vfb-feedback .visible').text()).toBe(messages['fruits'])

    // ─────────────────────────────────────────────────────────────────────────
    // Multiple-options Select field

    // select
    let select = wrapper.find('select[name=languages]')

    // first error
    const option1 = wrapper.find('option[value=go]')
    await option1.setSelected(true)
    expect(invalidFeedbackText()).toBe(validationErrors['languages']['few'])

    // second error
    const option2 = wrapper.find('option[value=bash]')
    await option2.setSelected(true)
    expect(invalidFeedbackText()).toBe(validationErrors['languages']['include'])

    // no errors
    const option3 = wrapper.find('option[value=java]')
    await option3.setSelected(true)
    expect(invalidFeedbacks()).toHaveLength(0)

    // expect the successful message to match
    expect(validFeedbackText('languages')).toBe(messages['languages'])

    // For some reason, the following code is not triggering the change event:
    // await option3.setSelected(false)
    // so, it needs to be trigged manually

    // second error again
    option3.element.selected = false
    await select.trigger('change')
    expect(invalidFeedbackText()).toBe(validationErrors['languages']['include'])

    // first error again
    option1.element.selected = false
    await select.trigger('change')
    expect(invalidFeedbackText()).toBe(validationErrors['languages']['few'])

    // clear again
    await option3.setSelected()
    expect(invalidFeedbacks()).toHaveLength(0)

    // expect the successful message to match again
    expect(validFeedbackText('languages')).toBe(messages['languages'])

    // ─────────────────────────────────────────────────────────────────────────
    // Single option Select field

    // invalid value
    select = wrapper.find('select[name=gender]')
    await select.setValue('')
    expect(invalidFeedbackText()).toBe(validationErrors['gender'])

    // valid value
    await select.setValue('male')
    expect(invalidFeedbacks()).toHaveLength(0)
    expect(validFeedbackText('gender')).toBe(messages['gender'])
})

test('it validates on submission', async () => {
    await wrapper.setProps({
        validateOnInput: false,
        validateOnSubmit: true,
    })

    // get the fields
    const bioField = wrapper.find('[name=bio]')
    const nameField = wrapper.find('[name=name]')
    const agreeField = wrapper.find('[name=agree]')
    const genderField = wrapper.find('[name=gender]')
    const checkboxes = wrapper.findAll('[name=fruits]').wrappers
    const options = wrapper.findAll('select[name=languages] option').wrappers

    // set invalid values for fields
    await bioField.setValue('Im Le')
    await nameField.setValue('Le')
    await genderField.setValue('')
    await agreeField.setChecked(false)
    checkboxes.forEach(async (c) => await c.setChecked(true))
    options.forEach(async (o) => await o.setSelected(true))

    // submit form
    await wrapper.trigger('submit')

    // expected error messages.
    // their order depends on the order of the fields (which field comes first)
    const expectedErros = [
        validationErrors['name']['short'],
        validationErrors['bio'],
        validationErrors['gender'],
        validationErrors['fruits']['many'],
        errors['agree'],
    ]

    // get the visible feedbacks
    const feedbacks = wrapper.findAll('.vfb-feedback-invalid.visible')
    const feedbackText = feedbacks.wrappers.map(f => f.text())

    // test feedback
    expect(feedbackText).toEqual(expectedErros)
})