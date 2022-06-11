import React from "react";
import { SuccessToast, ErrorToast } from "react-native-toast-message";
/**
 * Author of library: Calin Tamas
 * URL: https://github.com/calintamas/react-native-toast-message
 *
 * Code is inspired by github repository of library.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Calin Tamas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * **/
const toastConfig = {
    success: props => (
        <SuccessToast
            {...props}
            style={{ borderLeftColor: "#0BDC91", backgroundColor: "#7F7F81" }}
            text1Style={{
                fontWeight: "600",
                color: "#0BDC91",
                fontSize: 15,
            }}
            text1="Success"
            text2Style={{
                fontSize: 15,
                color: "white",
            }}
        />
    ),
    error: props => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: "#FF3168", backgroundColor: "#7F7F81" }}
            text1Style={{
                fontWeight: "600",
                color: "#FF3168",
                fontSize: 15,
            }}
            text1="Error"
            text2Style={{
                fontSize: 15,
                color: "white",
            }}
        />
    ),
};

export { toastConfig };
