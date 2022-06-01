$(document).ready(function () {

	(function ($) {
		"use strict";


		jQuery.validator.addMethod('answercheck', function (value, element) {
			return this.optional(element) || /^\bcat\b$/.test(value)
		}, "type the correct answer -_-");

		// validate contactForm form
		$(function () {
			$('#contactForm').validate({
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					subject: {
						required: true,
						minlength: 4
					},
					number: {
						required: true,
						minlength: 5
					},
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 20
					}
				},
				messages: {
					name: {
						required: "Адже у Вас є ім'я, чи не так?",
						minlength: "Ваше ім'я повинно складатися як мінімум з 2 символів."
					},
					subject: {
						required: "Гаразд, у Вас є тема, чи не так?",
						minlength: "Ваша тема повинна складатися не менше ніж з 4 символів."
					},
					number: {
						required: "У Вас є номер, чи не так?",
						minlength: "Ваш номер повинен складатися не менше ніж з 5 символів."
					},
					email: {
						required: "Нема електронної пошти - нема повідомлення."
					},
					message: {
						required: "Ем... так, Ви повинні написати щось, щоб відправити цю форму.",
						minlength: "І це все? Дійсно?"
					}
				},
				submitHandler: function (form) {
					$(form).addClass('_sending');
					$(form).ajaxSubmit({
						type: "POST",
						data: $(form).serialize(),
						url: "contact_process.php",
						success: function () {
							// $('#contactForm :input').attr('disabled', 'disabled');
							$(form).fadeTo('slow', 1, function () {
								$(form).trigger('reset');
								$(form).removeClass('_sending');
							});
							// $(form).fadeTo('slow', 0.3, function () {
							// 	$(this).find(':input').attr('disabled', 'disabled');
							// 	$(this).find('label').css('cursor', 'default');
							// 	$('#success').fadeIn()
							// 	$('.modal').modal('hide');
							// 	$('#success').modal('show');
							// })
						},
						error: function () {
							$(form).fadeTo('slow', 1, function () {
								// $(form).trigger('reset');
								$(form).removeClass('_sending');
							});
							// $(form).fadeTo('slow', 0.3, function () {
							// 	$('#error').fadeIn()
							// 	$('.modal').modal('hide');
							// 	$('#error').modal('show');
							// })
						}
					})
				}
			})
		})

	})(jQuery)
})