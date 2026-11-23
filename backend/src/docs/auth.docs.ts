/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication, user management, and profile customization
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Dani
 *               email:
 *                 type: string
 *                 example: danira@example.com
 *               phone:
 *                 type: string
 *                 example: "081234567890"
 *               password:
 *                 type: string
 *                 example: admin1234
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Email or phone already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: danira@example.com
 *               password:
 *                 type: string
 *                 example: admin1234
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation failed or invalid email or password
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/profile:
 *   patch:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Miftah
 *               email:
 *                 type: string
 *                 example: daninew@example.com
 *               phone:
 *                 type: string
 *                 example: "081209876543"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Email or phone already exists
 */

/**
 * @swagger
 * /auth/password:
 *   patch:
 *     summary: Change user password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: admin1234
 *               newPassword:
 *                 type: string
 *                 example: asat1234
 *               confirmPassword:
 *                 type: string
 *                 example: asat1234
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Validation failed or current password is incorrect
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/profile/image:
 *   patch:
 *     summary: Update user profile image
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *       400:
 *         description: Image is required or invalid
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
