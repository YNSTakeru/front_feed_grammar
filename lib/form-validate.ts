export const activateSubmitBtn = () => {
    const $form = document.querySelector('.validate__form') as HTMLFormElement

    if (!$form) return
    const $submitBtn = $form?.querySelector('button')!

    if ($form?.checkValidity()) {
        $submitBtn?.removeAttribute('disabled')
    } else {
        $submitBtn?.setAttribute('disabled', 'true')
    }
}

export const onBlurHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    invalidTargetRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
    const $target = e.currentTarget
    const $invalidTarget = invalidTargetRef.current!

    const { validity } = $target
    if (!$invalidTarget.classList.contains('invalid__feedback')) {
        return
    }

    if ($target.checkValidity()) {
        $target.classList.add('is-valid')
        $target.classList.remove('is-invalid')
        $invalidTarget.classList.add('is-valid')
        $invalidTarget.classList.remove('is-invalid')

        $invalidTarget.textContent = ''
    } else {
        $target.classList.add('is-invalid')
        $target.classList.remove('is-valid')
        $invalidTarget.classList.add('is-invalid')
        $invalidTarget.classList.remove('is-valid')
        if (validity.valueMissing) {
            $invalidTarget.textContent = '値の入力が必須です。'
        } else if (validity.tooLong) {
            $invalidTarget.textContent =
                $target.maxLength +
                '文字以下で入力してください。現在の文字数は' +
                $target.value.length +
                '文字です。'
        } else if (validity.patternMismatch) {
            $invalidTarget.textContent =
                'メールアドレスの形式で入力してください。(例)　abc@abc.com'
        }
    }
    activateSubmitBtn()
}
