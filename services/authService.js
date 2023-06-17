const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    JWT
} = require("../lib/const")
const SALT_ROUND = 10;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;
const addEmail = /[@]/g;
const dotEmail = /[.]/g;
const spacing = /[\s]/;

class authService {
    // ------------------------- Auth Register ------------------------- //
    static async handleRegister({
        userName,
        email,
        password,
        role
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const passworUppercase = password.match(upperCaseLetters);
            const passworNumbers = password.match(numbers);
            const passwordSpacing = password.match(spacing);
            const validationAddEmail = email.match(addEmail);
            const validationDotEmail = email.match(dotEmail);

            if (userName.length >= 15) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username maksimal 15 karakter.",
                    data: {
                        registeredUsers: null,
                    },
                };
            }

            if (!validationAddEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus memiliki @",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!validationDotEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus memiliki titik(.)",
                    data: {
                        registeredUsers: null,
                    },
                };
            }

            if (!passworUppercase) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus mengandung huruf besar.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!passworNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus mengandung angka.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (passwordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password tidak boleh diberi spasi.",
                    data: {
                        registeredUsers: null,
                    },
                };
            }

            const getUserByEmail = await userRepository.getByEmail({
                email
            });

            if (getUserByEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email telah digunakan.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
                const createdUser = await userRepository.handleRegister({
                    userName,
                    email,
                    password: hashedPassword,
                    role
                });

                return {
                    status: true,
                    statusCode: 201,
                    message: "Registrasi berhasil.",
                    data: {
                        registeredUsers: createdUser,
                    },
                };
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    registeredUsers: null,
                },
            };
        }
    };
    // ------------------------- end Auth Register ------------------------- //

    // ------------------------- Auth Login ------------------------- //
    static async handleLogin({
        email,
        password,
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const passworUppercase = password.match(upperCaseLetters);
            const passworNumbers = password.match(numbers);
            const passwordSpacing = password.match(spacing);

            if (password.length < 8) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (!passworUppercase) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (!passworNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (passwordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            }

            const getUserByEmail = await userRepository.getByEmail({
                email
            });

            if (!getUserByEmail) {
                return {
                    status: false,
                    statusCode: 404,
                    message: "email belum terdaftar",
                    data: {
                        loginUsers: null,
                    },
                };
            } else {
                const isPasswordMatch = await bcrypt.compare(password, getUserByEmail.password);

                if (isPasswordMatch) {
                    const token = jwt.sign({
                            id: getUserByEmail.id,
                            email: getUserByEmail.email
                        },
                        JWT.SECRET, {
                            expiresIn: JWT.EXPIRED,
                        });

                    return {
                        status: true,
                        statusCode: 200,
                        message: "Pengguna berhasil masuk",
                        data: {
                            token,
                        },
                    };
                } else {
                    return {
                        status: true,
                        statusCode: 400,
                        message: "email atau Password salah",
                        data: {
                            loginUsers: null,
                        },
                    };
                }
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    loginUsers: null,
                },
            };
        }
    };
    // ------------------------- End Login ------------------------- //
};

module.exports = authService;